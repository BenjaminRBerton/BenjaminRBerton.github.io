---
title: "QuestLab"
seo_title: "QuestLab: Research Questionnaire Software | Benjamin Berton"
description: "Open-source, multilingual questionnaire software for NASA-TLX, SUS, interviews, and human-in-the-loop laboratory experiments."
subtitle: "A lightweight platform for running questionnaire batteries in human-factors experiments."
date: 2026-06-09
year: 2026
project_type: "Research software"
status: "Open source"
featured: false
tags:
  - "Experiment Tools"
  - "Python"
  - "Flask"
  - "Human In The Loop Experiments"
role: "Designer and developer"
summary: "A configurable multilingual questionnaire platform designed for reliable data collection during in-lab studies."
hero_image: "/images/projects/questlab/readme.webp"
social_image: "/images/projects/questlab/screenshot-1.png"
social_image_alt: "QuestLab experiment and condition selection interface"
hero_alt: "QuestLab documentation showing its local-first questionnaire workflow and project structure"
hero_position: "top"
external_url: ""
github_url: "https://github.com/BenjaminRBerton/questlab"
publication_url: ""
related_projects: [human-oversight-adaptable-autonomy]
---

## What is it?

QuestLab is a self-hosted web application for running sequential questionnaire batteries during human-factors experiments. It is designed for laboratory use over a local network: participants enter a code on a tablet, laptop, or phone, and no internet connection is required.

The application was developed to make study configuration easy to inspect and change while protecting data collection from common laboratory failures.

- Every keystroke and selection is saved immediately to SQLite.
- A flat CSV is updated after each questionnaire submission.
- Experiments and conditions are declared in readable YAML files.
- Researchers can add or modify a study without changing application code.
- A progress screen supports multiple experimental conditions.
- Individual forms can provide language variants.
- Attention check questions can be embedded randomly in any standard or bespoke questionnaires.

QuestLab supports common questionnaire types including five and seven-point Likert scales, visual analogue scales, single and multiple choice, free text, and numeric fields. Bundled instruments include NASA-TLX, the System Usability Scale, trust in automation, and other project-specific questionnaires and questions types can be added as yaml components.

## Interface examples

The interface guides participants from experiment and condition selection through each questionnaire in the configured battery. It also supports researcher-facing interview guides for structured post-task sessions.

{{< carousel label="QuestLab interface examples" images="/images/projects/questlab/screenshot-1.png|/images/projects/questlab/screenshot-nasa-tlx-2.png|/images/projects/questlab/screenshot-sus-4.png|/images/projects/questlab/screenshot-itw-5.png" alts="QuestLab welcome screen with participant code, experiment, and condition controls|QuestLab NASA Task Load Index questionnaire with mental and physical demand sliders|QuestLab System Usability Scale questionnaire with five-point response controls|QuestLab bilingual interview guide with participant selection and recording controls" captions="Experiment and condition selection.|NASA-TLX workload questionnaire.|System Usability Scale questionnaire.|Researcher-facing interview guide." >}}
