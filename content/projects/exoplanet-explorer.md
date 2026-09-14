---
title: "Exoplanet Explorer"
subtitle: "An open-source educational videogame for learning and studying human–autonomy teaming."
date: 2026-01-01
year: 2025-2026
project_type: "Videogame · research and teaching resource"
status: "Open source · active development"
featured: true
tags:
  - "Human–Autonomy Teaming"
  - "Game Development"
  - "Godot"
  - "C#"
role: "Designer, developer"
summary: "A planetary-exploration game in which learners coordinate autonomous robots and experience teaming configurations directly."
hero_image: "/images/projects/exoplanet-explorer/exoplanet-explorer-thumbnail.png"
hero_alt: "Videogame starting menu and splashscreen"
hero_position: "center"
hero_fit: "contain"
card_image: "/images/projects/exoplanet-explorer/gifs/level4-gameplay-preview.gif"
card_position: "center"
card_fit: "cover"
external_url: "https://doi.org/10.5281/zenodo.18651448"
external_label: "Download the released version"
github_url: "https://github.com/BenjaminRBerton/Exoplanet-Explorer"
publication_url: ""
related_publications: []
related_conferences:
  - "aspire-2026"
---

## Overview

Exoplanet Explorer is an open-source educational game designed to make human–autonomy teaming tangible. The player supervises a planetary-exploration mission from Earth, coordinating a team of autonomous rovers and drones as they map an unfamiliar environment, manage limited resources, and search for a monolith.

The platform serves two purposes: it is a pedagogical tool for teaching Interdependence Analysis and a research testbed for studying human interaction with autonomous agents.

{{< youtube id="nd30w3JyyPI" title="Exoplanet Explorer gameplay and project overview" caption="Exoplanet Explorer gameplay and feature overview." >}}


## Designing for interdependence

The robots have different sensing, movement, and exploration capabilities. Drones can quickly survey difficult terrain, while rovers can perform ground tasks and analyze the mission target. Communication depends on relay coverage, energy is limited, and some failures require one robot to assist another.


These constraints make coordination visible. Learners must decide when to act manually, when to delegate, which agent should perform a task, and what information they need to understand the team's progress. The game was designed to surface three central requirements of Coactive Design:

- **Observability:** teammates can perceive relevant states and actions.
- **Predictability:** teammates can anticipate one another's behaviour.
- **Directability:** teammates can influence and redirect one another's actions.

{{< image src="/images/projects/exoplanet-explorer/gifs/2_2_rover_stuck_in_mud_and_recovery_procedure.gif" alt="A rover immobilized in mud while another robot conducts a recovery procedure" caption="A recovery task makes interdependence explicit: one robot cannot continue until another teammate assists it." >}}

## Teaching and exploratory evaluation

The game was used in a graduate Human–Autonomy Teaming course (IND8408 - Complex systems usability) as the environment for an Interdependence Analysis assignment. Students modelled task allocation, assessed agent capabilities, identified teaming requirements, and proposed interface improvements.

An exploratory classroom evaluation found that direct interaction helped students test assumptions, identify misconceptions about agent capabilities, and iteratively revise their analysis. The findings are preliminary, but they support the value of interactive environments for teaching joint-activity concepts that can remain abstract in text-only case studies.

{{< image src="/images/projects/exoplanet-explorer/teaching.png" alt="Benjamin Berton presenting student feedback in a classroom where Exoplanet Explorer is running on the students' computers" caption="Discussing student feedback after using Exoplanet Explorer in the graduate Human–Autonomy Teaming course at Polytechnique Montréal." >}}

The videogame will be presented as a demonstration during the session: CEDM8/HART11: Cognitive Engineering & Human-AI Demonstrations at the Human Factors and Ergonomics Society ASPIRE annual meeting.

Date/Time: Wed Oct 21, 4:30pm-5:30pm Pacific Time

## Development

I designed and developed the game in Godot using C#. It supports multiple maps and configurations, manual and autonomous robot control, partial observability, communications constraints, resource management, and human–robot task allocation.

{{< image src="/images/projects/exoplanet-explorer/gifs/2_3_rover_planning_and_executing_path_towards_monolith_and_winning.gif" alt="A rover planning and following a route to the monolith to complete the mission" caption="The robot plans and executes its route toward the mission objective while the player supervises its progress." >}}

The source is released under the MIT License. Version 1.0.0 is archived through Zenodo with DOI [10.5281/zenodo.18651448](https://doi.org/10.5281/zenodo.18651448).

## Releases

Permanent release information is available through Zenodo. Platform-specific Windows and Linux download buttons will be added here

## Gameplay

{{< carousel label="Exoplanet Explorer gameplay" images="/images/projects/exoplanet-explorer/gifs/level4_gameplay.gif|/images/projects/exoplanet-explorer/gifs/base_drop_3.gif|/images/projects/exoplanet-explorer/gifs/1_4_zoom_up_close_rover_and_drone.gif" alts="Extended Level 4 gameplay showing exploration and coordination through mission completion|The Exoplanet Explorer mission base deploying into a planetary environment|Close gameplay view of a rover and drone exploring together" captions="A complete level playthrough, from exploration and coordination to mission completion.|Each mission begins by deploying the base and robot team into a new exploration area.|Rovers and drones contribute different capabilities to the same exploration mission." >}}
