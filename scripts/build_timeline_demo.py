#!/usr/bin/env python3
"""Build the compact, self-demonstration dataset used by timeline.html."""

from __future__ import annotations

import argparse
import csv
import json
import shutil
import subprocess
from pathlib import Path


SCENARIOS = {
    "support": "scenario_08_TARS_24L_winds",
    "slow": "scenario_05_TARP-S_06R_flaps",
    "fast": "scenario_02_TARP-F_24R_alt",
}

COCKPIT_STREAMS = {
    # The supplied TARS Support scenario has no back/cockpit recording. Its
    # synchronized Smart Eye capture is the closest truthful human-facing view.
    "support": "eye",
    "slow": "back",
    "fast": "back",
}

PUBLIC_AGENTS = {
    "Aircraft",
    "ATC_Agent",
    "PanelListener",
    "Pedestal",
    "Remote_Control_Agent",
    "Shared Interface",
    "Speech_to_Text_Agent",
    "TARS Agent",
}

EYE_SOURCES = {
    "an_blink",
    "an_fixation",
    "an_saccade",
    "filtered_closest_world_object_name",
    "pupil_diameter",
    "pupil_diameter_quality",
}


def keep_row(row: list[str], last_kept: dict[tuple[str, str], tuple[int, str]]) -> bool:
    if len(row) < 7:
        return False

    agent, source, value = row[2].strip(), row[3].strip(), row[6]
    if agent in PUBLIC_AGENTS:
        return True
    if agent != "SmartEyeProBridge" or source not in EYE_SOURCES:
        return False

    try:
        timestamp = int(row[1])
    except ValueError:
        return False

    key = (agent, source)
    previous = last_kept.get(key)
    interval_us = 100_000 if source.startswith("pupil_") else 80_000
    if previous and value == previous[1] and timestamp - previous[0] < interval_us:
        return False

    last_kept[key] = (timestamp, value)
    return True


def compact_csv(source: Path, target: Path) -> None:
    with source.open(newline="", encoding="utf-8") as src, target.open(
        "w", newline="", encoding="utf-8"
    ) as dst:
        reader = csv.reader(src, delimiter=";")
        writer = csv.writer(dst, delimiter=";", lineterminator="\n")
        writer.writerow(next(reader))

        def write_public_row(row: list[str]) -> None:
            public_row = row.copy()
            public_row[0] = ""  # UUID is unused by the viewer.
            public_row[5] = ""  # Ingescape timestamp is also unused.
            writer.writerow(public_row)

        last_kept: dict[tuple[str, str], tuple[int, str]] = {}
        first_row: list[str] | None = None
        last_row: list[str] | None = None
        last_written: list[str] | None = None
        for row in reader:
            if first_row is None:
                first_row = row
            last_row = row
            if keep_row(row, last_kept):
                write_public_row(row)
                last_written = row

        # The first source row is an Aircraft state and is retained. Preserve the
        # original end time explicitly if the final row was filtered out.
        if first_row is not None and last_written is None:
            write_public_row(first_row)
            last_written = first_row
        if last_row is not None and last_row != last_written:
            write_public_row(last_row)


def compact_annotations(source: Path, target: Path, csv_name: str) -> None:
    if not source.exists():
        target.write_text(json.dumps({"csv": csv_name, "annotations": []}, indent=2) + "\n")
        return

    payload = json.loads(source.read_text(encoding="utf-8"))
    annotations = payload.get("annotations", [])
    for annotation in annotations:
        # Source annotations were recorded in microseconds; the viewer uses seconds.
        rel_sec = float(annotation.get("relSec", 0))
        if rel_sec > 100_000:
            annotation["relSec"] = rel_sec / 1_000_000
    target.write_text(
        json.dumps({"csv": csv_name, "annotations": annotations}, indent=2) + "\n",
        encoding="utf-8",
    )


def compact_video(source: Path, target: Path) -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required to build the public timeline videos")

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-v",
            "warning",
            "-i",
            str(source),
            "-map",
            "0:v:0",
            "-map",
            "0:a?",
            "-vf",
            "scale=854:-2:flags=lanczos,fps=20",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "30",
            "-movflags",
            "+faststart",
            "-c:a",
            "aac",
            "-b:a",
            "64k",
            "-ac",
            "1",
            str(target),
        ],
        check=True,
    )


def create_poster(source: Path, target: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-v",
            "warning",
            "-ss",
            "60",
            "-i",
            str(source),
            "-frames:v",
            "1",
            "-vf",
            "scale=854:-2:flags=lanczos",
            "-c:v",
            "libwebp",
            "-quality",
            "82",
            str(target),
        ],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        type=Path,
        default=Path(".local-data/timeline_p14_data"),
        help="Folder containing the original scenarios directory.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("static/documents/timeline-demo-data"),
    )
    parser.add_argument("--skip-videos", action="store_true")
    args = parser.parse_args()

    source_dir = args.source / "scenarios"
    args.output.mkdir(parents=True, exist_ok=True)

    for public_name, source_name in SCENARIOS.items():
        csv_name = f"{public_name}.csv"
        compact_csv(
            source_dir / f"{source_name}_ingescape.csv",
            args.output / csv_name,
        )
        compact_annotations(
            source_dir / f"{source_name}_annotations.json",
            args.output / f"{public_name}-annotations.json",
            csv_name,
        )
        if not args.skip_videos:
            compact_video(
                source_dir / f"{source_name}_tars.mp4",
                args.output / f"{public_name}-tars.mp4",
            )
            create_poster(
                source_dir / f"{source_name}_tars.mp4",
                args.output / f"{public_name}-tars-poster.webp",
            )
            compact_video(
                source_dir / f"{source_name}_{COCKPIT_STREAMS[public_name]}.mp4",
                args.output / f"{public_name}-cockpit.mp4",
            )
            create_poster(
                source_dir / f"{source_name}_{COCKPIT_STREAMS[public_name]}.mp4",
                args.output / f"{public_name}-cockpit-poster.webp",
            )


if __name__ == "__main__":
    main()
