---
title: "Assessing Augmented Reality in Constrained Environments"
subtitle: "A methodology for evaluating the physical, physiological, and cognitive effects of head-mounted displays in operational settings."
date: 2023-10-10
year: 2023
project_type: "Applied human-factors research"
status: "Published research"
featured: true
story_layout: true
tags:
  - "Augmented Reality"
  - "Human Factors"
  - "Multimodal Assessment"
  - "Aviation"
role: "Human-factors researcher and study engineer"
summary: "A methodology combining physical, visual, attentional, cognitive, and subjective measures to assess head-mounted augmented reality in constrained environments."
hero_image: "/images/projects/augmented-reality/clutter_maps.gif"
hero_alt: "Head-mounted augmented-reality symbology overlaid on the view from an aircraft cockpit"
hero_position: "center"
hero_fit: "contain"
card_image: "/images/projects/augmented-reality/clutter_maps.gif"
card_position: "center"
card_fit: "cover"
publication_url: "https://doi.org/10.1145/3624323.3624332"
related_projects: []
related_publications:
  - "augmented-reality-constrained-environments"
related_conferences:
  - "ergoia-2023"
---

How can the effects of a head-mounted augmented-reality system be assessed without separating the display from the work environment, task, and operator using it? This project developed a practical methodology for studying AR in constrained, safety-critical workplaces

The work was conducted through ESTIA-TECH's PEPSS platform in association with the Airbus/CORAC TOUCANS project. It was published at Ergo’IA 2023.

## 01 — The variety of HMD's effects on human operators

An HMD changes the wearer's mass and centre of gravity and can affect posture and muscular effort. Its optics and exposure time can contribute to visual fatigue or cybersickness. Virtual symbology can compete with the real scene for attention, add visual clutter, or encourage attentional tunnelling.

A faithful evaluation therefore has to examine several interacting dimensions:

- **Physical:** head-supported weight, pressure, heat, posture, and neck or shoulder muscular activity.
- **Physiological:** visual fatigue, discomfort, cybersickness, blinking, and changes in flicker perception.
- **Cognitive:** mental workload, situation awareness, visual clutter, and the distribution of attention.
- **Subjective:** comfort, usability, symptoms, perceived clutter, and the operator's account of the experience.

The methods were selected according to the likelihood and operational severity of each effect, and whether the instrumentation could fit inside a constrained work environment.

The cockpit footage below is an illustrative excerpt from an [Airbus video published by Aviation Week](https://www.youtube.com/watch?v=5MaP7N_ifRM); it is not footage produced during this study.

{{< image src="/images/projects/augmented-reality/ar_symbo.gif" alt="Animated recording of augmented-reality symbology overlaid on the view from an aircraft cockpit" caption="Illustrative Airbus HMD symbology from the Aviation Week source video, shown to demonstrate how a virtual layer can interact with an operational scene." >}}

## 02 — Testing the protocol

The evaluation campaign was tested with six operators. Each operator completed a familiarization and two operational scenarios: one with the HMD and one without it. The order was counterbalanced so that learning or fatigue would not systematically favour either condition.

Measurements were taken before, during, and after the scenarios. Keeping the two conditions close in task content made within-participant comparison possible. 

The published work presents and critiques the methodology; it does not report outcome claims from the participant data.

## 03 — Physical stress and comfort

The physical protocol combined surface electromyography with observation and self-report. Compact wireless sensors recorded activity from the sternocleidomastoid and superior trapezius muscles while operators held six defined head and neck positions.

Instead of asking participants to perform a maximum voluntary contraction which could introduce pain or risk, the protocol compared matched measurements from the same person with and without the HMD for the whole duration of the operational scenarios. In addition, visual analogue scales, established questionnaires, and a debrief complemented the muscle-activity data with perceived pressure, heat, imbalance, and discomfort.

{{< image src="/images/projects/augmented-reality/semg.png" alt="Anatomical illustration showing a surface electromyography sensor positioned over the sternocleidomastoid muscle of the neck" caption="Illustration of the sEMG placement used to examine neck-muscle activity with and without the head-mounted display." >}}

## 04 — Visual fatigue and the CFFF instrument

Critical flicker-fusion frequency provides one indicator of visual fatigue. I developed a compact Arduino-based instrument that varies an LED from visibly flickering to apparently continuous light. The operator records thresholds once while frequency rises and once while it falls; their average provides the CFFF value.

{{< image src="/images/projects/augmented-reality/cfff-test.gif" alt="Animated simulation of the Arduino critical flicker-fusion frequency instrument cycling through a test" caption="Simulated CFFF test sequence. A compact instrument was necessary because the assessment had to travel into the constrained test environment." >}}

CFFF was measured before the session and after each operational scenario, alongside the oculomotor portion of the Simulator Sickness Questionnaire, a visual-fatigue scale, and blink-rate analysis. Dry runs also revealed practical sources of error—including viewing distance, squinting, and ambient light—which led to the recommendation of a controlled eyepiece around the LED.

The CFFF instrument's Arduino source code, wiring information, and supporting files are available in the [Critical Flicker Fusion Frequency repository](https://github.com/BenjaminRBerton/Critical-Flicker-Fusion-Frequency).

{{< button href="https://github.com/BenjaminRBerton/Critical-Flicker-Fusion-Frequency" label="View the CFFF source" external="true" >}}

Blink analysis was also developed in-house. A convolutional neural network processed the eye-camera images from the Pupil Labs eye tracker and classified them as an open eye, a complete blink, or an incomplete blink. This supplied a blink-related indicator for the visual-fatigue protocol while retaining the same wearable eye-tracking system in the HMD and no-HMD conditions. The demonstration below uses recordings of my own eyes, not research-participant data.

{{< image src="/images/projects/augmented-reality/blinks.gif" alt="Animated development interface showing a neural network classifying Pupil Labs eye-camera images as open eyes, complete blinks, or incomplete blinks" caption="The in-house CNN classifying eye-camera images into open-eye, complete-blink, and incomplete-blink categories. This demonstration shows my own eyes; no participant recording is displayed." >}}

The trained model and supporting analysis code are available in the [blink-analysis repository](https://github.com/BenjaminRBerton/blink-analysis).

{{< button href="https://github.com/BenjaminRBerton/blink-analysis" label="View the blink-analysis source" external="true" >}}

## 05 — Quantifying visual clutter

To examine how virtual information changes the visual scene, the HMD recording was superimposed on the operator's point-of-view video. A video-processing workflow then calculated feature congestion, edge density, and subband entropy for each frame. A separate active-pixel measure estimated how much of each frame was occupied by opaque virtual content.

Objective image measures were paired with a structured Clutter Rating Scale. This combination matters because two interfaces can occupy a similar amount of screen space while differing substantially in legibility, organization, and perceived interference.

{{< image src="/images/projects/augmented-reality/clutter_maps.gif" alt="Animated visual-clutter analysis showing synchronized cockpit footage, a feature-congestion map, and frame-by-frame clutter scores" caption="The synchronized analysis view aligns every source-video frame with its clutter map and evolving feature-congestion and subband-entropy scores." >}}

The reusable analysis pipeline is available in the [video visual clutter repository](https://github.com/BenjaminRBerton/video-visual-clutter).

{{< button href="https://github.com/BenjaminRBerton/video-visual-clutter" label="View the visual-clutter source" external="true" >}}

## 06 — Attention and visual exploration

Eye tracking through an HMD is itself an instrumentation problem. A remote tracker cannot reliably observe eyes through the visor, while the embedded HoloLens tracker did not provide the sampling rate or blink and pupil measures required by the protocol. The solution adapted 120 Hz binocular Pupil Labs glasses to the HoloLens 2 and retained the same glasses in the no-HMD condition for metrological consistency.

An inertial sensor captured head rotation in parallel. Together, gaze and head data supported measures such as fixation count and duration, saccade distance, visual path length, shifts between the display and environment, unexpected-event detection, and eye–head coordination.

The machine-learning model and analysis code used to identify gaze shifts are available in the [gaze-shift-analysis repository](https://github.com/BenjaminRBerton/gaze-shift-analysis).

{{< button href="https://github.com/BenjaminRBerton/gaze-shift-analysis" label="View the gaze-shift source" external="true" >}}

## 07 — Discussion

No single measurement can establish whether an AR system is suitable for constrained work. Electromyography can reveal muscular demand but is sensitive to placement and movement. Image metrics quantify visual structure but not whether the information is useful. Eye tracking shows where someone looks, not what they understand. Questionnaires capture experience but remain retrospective and subjective.

The methodology addresses those limitations through convergence: instrumented physical and visual measures are interpreted alongside NASA-TLX workload, SART situation awareness, SUS usability, symptom scales, observation, and interviews. The result is a reusable assessment framework that can be adapted to the task, environment, display, and risks of a specific industrial setting.

## 08 — Publication

The complete protocol, its design rationale, and its methodological limitations are described in the peer-reviewed [Ergo’IA 2023 paper](https://doi.org/10.1145/3624323.3624332), co-authored with Chloé Morel-Targosz, Romain Chaumillon, and Marion Wolff.
