# Personal research and portfolio website

A small, content-driven website built with [Hugo](https://gohugo.io/). It produces static HTML, CSS, images, and media—there is no JavaScript framework, database, backend, CMS, or required theme.

The normal publishing workflow is: edit Markdown, preview locally, commit, and push to `main`. GitHub Actions builds the site and deploys the generated `public/` directory to GitHub Pages.

## Content audit before first publication

The first content pass is based on Benjamin Berton's resume, supplied project material, and public project and publication records. Before the first push, check:

- the Hugging Face Space URL in `content/projects/interdependence-analysis.md`;
- the preferred citation year for the Ergo'IA publication;
- that the email address, phone number, and other details in the downloadable resume are intended to be public;
- dates, titles, and wording for work that is still upcoming or in progress.

Private contracts, test-score evidence, proposals, contact lists, and unpublished manuscript files are intentionally not copied into the website.

## Repository map

```text
.
├── archetypes/             Templates used by `hugo new content`
├── assets/css/main.css     Editable design system and all site styles
├── content/                Markdown and front matter: the source of truth
│   ├── projects/
│   ├── publications/
│   ├── conferences/
│   ├── education/
│   ├── experience/
│   └── awards/
├── layouts/
│   ├── _default/           Base, fallback, and CV templates
│   ├── partials/           Reused header, footer, cards, and entries
│   ├── projects/           Project list and detail templates
│   ├── publications/       Publication list and detail templates
│   ├── conferences/        Presentation list and detail templates
│   └── shortcodes/         Image, gallery, video, and button helpers
├── static/                 Files copied directly to the built site
│   ├── images/
│   ├── videos/
│   ├── documents/
│   └── favicon/
├── .github/workflows/      GitHub Pages build and deployment
└── hugo.toml               Site-wide configuration and navigation
```

Hugo generates `public/` during a build. It is ignored by Git and should not be committed.

## Local development

### 1. Install Hugo

Install a recent Hugo release (the extended edition is also fine). Follow the [official installation guide](https://gohugo.io/installation/) and verify it:

```bash
hugo version
```

The GitHub workflow pins its own Hugo version, independently of your local installation.

### 2. Clone and preview

```bash
git clone https://github.com/BenjaminRBerton/BenjaminRBerton.github.io.git
cd BenjaminRBerton.github.io
hugo server
```

Open the local address printed by Hugo, normally `http://localhost:1313/`. Hugo watches files and refreshes the site while you edit. To include content marked as a draft, run `hugo server -D`.

Run a production-style check before pushing:

```bash
hugo --gc --minify
```

## Add a project

Create a file from the project archetype:

```bash
hugo new content projects/my-project.md
```

Or copy `content/projects/example-research-project.md`. The filename becomes the default URL slug: `my-project.md` becomes `/projects/my-project/`.

Project front matter supports these optional fields:

```yaml
---
title: "Project name"
subtitle: "Short page introduction"
date: 2026-01-01
year: 2026
project_type: "Software"
status: "Completed"
featured: true
tags:
  - "Human Factors"
  - "Research"
role: "Researcher / Developer"
summary: "Short summary used on cards."
hero_image: "/images/projects/my-project/hero.webp"
hero_alt: "Meaningful description of the hero image"
hero_position: "center"
hero_fit: "cover"
card_image: ""
card_position: "center"
card_fit: "cover"
external_url: ""
external_label: "Launch project"
github_url: ""
github_label: "View source"
publication_url: ""
poster_url: ""
slides_url: ""
pdf_url: ""
story_layout: false
downloads:
  windows: ""
  linux: ""
  macos: ""
related_publications:
  - "paper-filename-without-md"
related_conferences:
  - "presentation-filename-without-md"
related_projects:
  - "related-project-filename-without-md"
---
```

No optional field is required. Empty links and metadata are not rendered. `featured: true` makes an entry eligible for the homepage. Project lists sort by `year`, newest first. Use `hero_position` with a CSS object-position value such as `center` or `top` to control the crop, or set `hero_fit: "contain"` when the whole image must remain visible. Set `card_image`, `card_position`, and `card_fit` when the image used in project cards should differ from the project-page hero. Set `story_layout: true` for a wider, sectioned long-form project narrative. Project headers can link directly to a `poster_url` or `slides_url`, and `github_label` can clarify when a repository contains only one component. Use `related_projects`, `related_publications`, and `related_conferences` to surface connected work at the end of the page.

The descriptive field is named `project_type` rather than `type` because Hugo reserves `type` for template lookup. Using `project_type` prevents a value such as `Videogame` from accidentally bypassing the project template.

Use `external_url` for Hugging Face or another externally hosted application, and optionally customize its button with `external_label`. Do not iframe the app. Use `downloads` for GitHub Release assets; do not put installers in this repository. A stable link looks like:

```text
https://github.com/USER/REPO/releases/latest/download/Game-Windows-x64-Setup.exe
```

Adding macOS later is only a matter of populating `downloads.macos`.

## Add a publication

```bash
hugo new content publications/my-paper.md
```

Publication front matter:

```yaml
---
title: "Paper title"
date: 2026-01-01
year: 2026
authors:
  - "Author One"
  - "Author Two"
journal: "Journal or proceedings"
doi: "10.xxxx/example"
publication_url: ""
pdf: "/documents/paper.pdf"
featured: true
related_projects:
  - "my-project"
---
```

Use the DOI value itself, without `https://doi.org/`. Publications are automatically reused on the publications page, homepage, CV, and linked project pages. Lists sort by `year`, newest first.

## Add a presentation

```bash
hugo new content conferences/my-presentation.md
```

Conference front matter:

```yaml
---
title: "Presentation title"
date: 2026-01-01
event: "Conference name"
location: "City, Country"
year: 2026
presentation_type: "Conference presentation"
authors:
  - "Benjamin R. Berton"
image: "/images/conferences/event/slide.webp"
image_alt: "Description of the slide or poster image"
poster_url: ""
slides_url: ""
publication_url: ""
featured: true
related_projects:
  - "my-project"
---
```

These entries appear automatically on the presentations list, homepage when featured, and CV.

## Maintain the CV

The HTML CV is the primary version. It assembles:

- education from `content/education/*.md`;
- research and professional experience from `content/experience/*.md`;
- publications from `content/publications/*.md`;
- presentations from `content/conferences/*.md`;
- awards from `content/awards/*.md`;
- technical skills from front matter in `content/cv.md`;
- free-form sections such as teaching from the Markdown body of `content/cv.md`.

To offer a PDF, put it at `static/documents/cv.pdf` and set this in `content/cv.md`:

```yaml
pdf: "/documents/cv.pdf"
```

The CV stylesheet also has a simple print layout.

## Images and video

Keep files grouped by project:

```text
static/images/projects/my-project/hero.webp
static/images/projects/my-project/screenshot-01.webp
static/videos/my-project/demo.mp4
```

Use WebP for photographic and screenshot content when practical. Resize and compress media before committing it. Always write meaningful alt text for informative images. Do not place game installers, raw datasets, large archives, or long videos in this repository.

### Image

```go-html-template
{{< image src="/images/projects/my-project/figure.webp" alt="Chart showing the main result" caption="Figure 1. Optional caption." >}}
```

### Two- or multi-image gallery

Separate matching image paths, alt text, and captions with `|`:

```go-html-template
{{< gallery images="/images/projects/demo/a.webp|/images/projects/demo/b.webp" alts="First interface state|Second interface state" captions="Before the intervention.|After the intervention." >}}
```

### Video

A normal clip shows controls, remains muted initially, and uses metadata-only preload:

```go-html-template
{{< video src="/videos/my-project/demo.mp4" poster="/images/projects/my-project/poster.webp" caption="Short interface demonstration." >}}
```

For a silent decorative loop, add `autoplay="true"`:

```go-html-template
{{< video src="/videos/my-project/loop.mp4" poster="/images/projects/my-project/poster.webp" autoplay="true" >}}
```

For a YouTube video, provide only its video ID. The shortcode uses YouTube's privacy-enhanced embed domain and maintains a responsive 16:9 frame:

```go-html-template
{{< youtube id="VIDEO_ID" title="Accessible video title" caption="Optional caption." >}}
```

### Button

```go-html-template
{{< button href="https://example.com" label="Launch project" external="true" >}}
```

Prefer front matter link fields when a link belongs in a project header. The button shortcode is for a contextual link inside the Markdown body.

### HITLS timeline demonstration

The public timeline viewer lives at `static/documents/timeline.html`; its compact self-participant data is in `static/documents/timeline-demo-data/`. The original 3.1 GB capture is kept locally under `.local-data/timeline_p14_data/` and is intentionally excluded from Git and the deployed website.

After changing the local source capture, rebuild the public CSV and video derivatives with:

```bash
python3 scripts/build_timeline_demo.py
```

The script retains the three public conditions and the data used by the viewer while downsampling high-frequency eye-tracking streams and compressing synchronized cockpit and TARS-interface videos. Because the supplied TARS Support capture has no cockpit-camera file, that condition uses its synchronized Smart Eye recording as the left-hand human-facing view.

## Change navigation or site-wide links

Edit `hugo.toml`. Navigation items live under `[menus]`; name, destination, and ordering are controlled by `name`, `pageRef`, and `weight`. Footer links and the display name live under `[params]`. Leave an optional value empty to hide it.

The design tokens at the top of `assets/css/main.css` control colors, widths, spacing, and fonts. No theme package needs to be updated.

Linux Libertine is self-hosted from `static/fonts/linux-libertine/` in regular, italic, bold, and bold-italic styles. Body copy and editorial headings use Libertine; calls to action, buttons, menus, labels, tags, and other short interface text use its sans-serif companion, Linux Biolinum. The license is included in the same directory. The `@font-face` declarations and fallback stacks live at the top of `assets/css/main.css`.

## GitHub Pages deployment

The workflow in `.github/workflows/hugo.yaml` runs on every push to `main`:

1. check out the repository;
2. configure the Pages environment;
3. install the pinned Hugo version;
4. build and minify the site with the correct Pages base URL;
5. upload `public/` as a Pages artifact;
6. deploy that artifact to GitHub Pages.

One-time repository setup:

1. Use a repository named `USERNAME.github.io` for a user site, or any repository name for a project site.
2. Ensure your default branch is named `main`. For an older local repository, use `git branch -m main` before the first push.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Replace `USERNAME` in `hugo.toml`. For a project site, a conventional local `baseURL` is `https://USERNAME.github.io/REPOSITORY/`; deployment itself receives the correct URL from GitHub Pages.
6. Commit and push to `main`, then inspect the run under the **Actions** tab.

Normal publishing is then:

```bash
git add .
git commit -m "Add new project"
git push
```

The action follows the current official Hugo/GitHub Pages artifact approach; generated output remains outside source control.

## Add a custom domain later

No architecture change is required:

1. Configure the domain under **Settings → Pages → Custom domain**.
2. Add the DNS records shown by GitHub.
3. Change `baseURL` in `hugo.toml` to the canonical custom-domain URL.
4. Enable **Enforce HTTPS** after GitHub provisions the certificate.

GitHub manages the deployment URL used by the workflow. A custom domain does not require different templates or a different host.

## Basic content rules

- Use one Markdown file per project, publication, presentation, CV item, or award.
- Keep filenames short, stable, lowercase, and hyphenated; relationships use these filename slugs.
- Use root-relative media paths beginning with `/`.
- Leave optional front matter values empty instead of removing template code.
- Preview before pushing and fix missing-image paths or broken external links.
- Keep large software releases in a separate GitHub Releases repository and link to them.
