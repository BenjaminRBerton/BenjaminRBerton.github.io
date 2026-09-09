---
title: "Human Oversight of Adaptable Flight-Deck Autonomy"
subtitle: "A human-in-the-loop study of how function allocation, action timing, and pilot configuration shape effective oversight."
date: 2026-09-08
year: 2026
project_type: "Human-in-the-loop simulation study"
status: ""
featured: true
story_layout: true
tags:
  - "Human Oversight"
  - "Adaptable Autonomy"
  - "Function Allocation"
  - "Aviation Human Factors"
role: "Lead researcher and experimental designer"
summary: "A study with 18 professional pilots examining how autonomy level, execution timing, and pilot-configured allocation affect oversight in a demanding flight-deck scenario."
hero_image: "/images/projects/human-oversight-adaptable-autonomy/TARS_HITLS_TRAILER.gif"
hero_alt: "Annotated flight-simulator study setup with the TARS tablet, Smart Eye Pro eye tracking, and video cameras"
hero_position: "center"
hero_fit: "contain"
card_image: "/images/projects/human-oversight-adaptable-autonomy/TARS_HITLS_TRAILER.gif"
card_position: "center"
card_fit: "contain"
external_url: "/projects/human-oversight-adaptable-autonomy/timeline/"
external_label: "Explore an instrumented HITLS session →"
external_emphasis: true
github_url: ""
publication_url: ""
related_projects:
  - "flight-deck-hat-testbed"
  - "interdependence-analysis"
related_publications: []
related_conferences: []
---

How should an autonomous cockpit teammate act so that it reduces workload without pushing the pilot out of the control loop? This project examines that question through a human-in-the-loop simulation with 18 professional pilots.

The study uses an in-house developped autonomous flight deck agent named TARS, X-Plane 11, and  Ingescape platform developed for the [Human–Autonomy Teaming Flight-Deck Simulation Framework](/projects/flight-deck-hat-testbed/).

## 01 — The oversight problem

An autonomous system can make an operation more efficient while simultaneously making its own behaviour harder to inspect, anticipate, or redirect. Regulators are calling for enabling Effective human oversight on these autonomous systems. Researchers have identified four capabilities necessary for human oversight:

- **Causal power:** the pilot can intervene and affect what happens.
- **Epistemic access:** the pilot can understand the system's state, reasoning, and consequences.
- **Self-control:** workload and attention remain sufficient for deliberate action.
- **Fitting intentions:** the system's actions remain aligned with the pilot's goals and the operational situation.

The experiment was designed to see how different function allocations and action timings preserve or erode those capabilities during a demanding flight scenario.

## 02 — Building our adaptable autonomy TARS

A pilot-validated task analysis decomposed a takeoff - birdstrike - engine failure scenario into 11 procedures and 85 tasks. Interdependence Analysis then mapped what the pilot and TARS could perform, where either teammate could support the other, and what information or control each needed to coordinate.

The resulting design space allowed for multiple configurations, with mandatory or opportunistic interdependence

{{< gallery fit="contain" columns="1" images="/images/projects/human-oversight-adaptable-autonomy/allocation-graph.webp|/images/projects/human-oversight-adaptable-autonomy/allocation-space.webp" alts="Joint Activity Graph comparing a pilot-performer TARS-supporter allocation with a TARS-performer pilot-supporter allocation|Donut chart showing the distribution of task types in the Interdependence Analysis allocation space" captions="Two contrasting allocations represented as Joint Activity Graphs.|Most scenario tasks required coordination or allowed more than one performer." >}}

## 03 — Four forms of autonomy

Each participant experienced four configurations in a within-subject design:

1. **TARS-Support:** the pilot performs the work while TARS offers task-specific support.
2. **TARS-Performer Slow:** TARS performs feasible tasks with a five-second margin before and after each action.
3. **TARS-Performer Fast:** TARS performs after announcing its intent, without the additional delay.
4. **TARS-Custom:** the pilot chooses who performs each eligible task and whether TARS acts immediately or after a delay.

The first three conditions isolated autonomy level and execution timing. The final condition involved adaptability: pilots could configure the autonomy's responsibility and speed of execution to match their own strategy rather than accept one allocation preset.

## 04 — An interface for observable, predictable, directable autonomy

The participant and agent could interact through a tablet interface built on the results of the Interdependence Analysis. It made the current, previous, and upcoming tasks visible alongside their allocation and the agent's state. Announcements and countdowns exposed pending actions, while accept, cancel, correct, and direct controls gave the pilot ways to intervene.

{{< image src="/images/projects/human-oversight-adaptable-autonomy/tars-interface-annotated.webp" alt="Annotated TARS interface identifying task context, agent state, countdowns, and pilot intervention controls" caption="The TARS interface." >}}

The clips below show the interface, simulator, and Ingescape platform operating as one experimental system.

{{< carousel label="Human-in-the-loop experiment system" images="/images/projects/human-oversight-adaptable-autonomy/gifs/TARS_interface_video_trimmed.gif|/images/projects/human-oversight-adaptable-autonomy/simu_outside.jpeg|/images/projects/human-oversight-adaptable-autonomy/gifs/ingescape_video_trimmed.gif" alts="Animated TARS tablet interface during a flight-deck procedure|Animated X-Plane forward view during the simulated flight|Animated Ingescape interface showing communication among experimental software agents" captions="TARS communicates its state and upcoming actions through the shared interface.|The VirtualFlight Duo simulator used at Polytechnique for HITLS.|Ingescape connects the simulator, TARS, interface, and data-collection services as agents that communicate through inputs/outputs over the local network. it allows to control the experimental setup (e.g. send an allocation to TARs, change runway, ...) and record data from each agent including eye-tracking, and HRV, synchronized through the platform's clock." >}}

## 05 — The flight scenario

Participants flew a single-pilot Cessna Citation C510 Mustang from Montréal–Trudeau toward Ottawa in low visibility. A bird strike after decision speed produced an engine failure and fire, requiring the pilot to continue takeoff, stabilize and climb, engage the autopilot, complete the fire procedure, declare the emergency, and follow air-traffic-control vectors.

Three embedded TARS errors affecting altitude, flap configuration, and wind information were rotated across the non-custom non-training conditions. This made oversight observable through intervention and error correction, not only through questionnaire responses.

The simulator combined a Virtual Fly DUO Sim MEG cockpit, X-Plane 11, the TARS touchscreen, Smart Eye Pro eye tracking, POLAR H10 HRV, and two video cameras. Participants could interact with TARS through touchscreen, a physical yoke control, and voice commands.

## 06 — Measuring Human-Autonomy Team

The study combined metrics at several levels:

- behavioural intervention and automation-error correction;
- NASA-TLX workload, trust in automation, perceived risk, perceived control, and team effectiveness questionnaires;
- flight-path and aircraft-control performance;
- gaze behaviour from eye tracking;
- Heart-Rate Variability;
- a semi-directed interview at the end of the experiment.

## 07 — Explore the experiment data

The [interactive HITLS timeline](/projects/human-oversight-adaptable-autonomy/timeline/) aligns cockpit and TARS-interface recordings with agent state, pilot and aircraft actions, flight parameters, gaze areas, saccades and fixations, blinks, and pupil diameter. It provides a concrete view of both the simulated flight and the instrumentation behind the experiment.

The demonstration uses my own recordings rather than research-participant data.

{{< button href="/projects/human-oversight-adaptable-autonomy/timeline/" label="Explore the HITLS timeline →" >}}

## 08 — Delegation impact on performance and oversight

When TARS only supported the pilot, participants corrected 10 of 14 embedded errors (71%). They corrected 5 of 14 errors (36%) with the slower performer and 6 of 14 (43%) with the faster performer. The support condition also produced the highest reported workload, with a mean NASA-TLX score of 55.83, compared with 46.67 and 46.37 in the two performer conditions.

Delegating feasible tasks improved several flight-performance measures, including slip/skid and roll error. The fast performer also reduced navigation cross-track error relative to support. Pilots nevertheless reported greater perceived risk in the fast condition, while the slower timing offered a clearer temporal margin to understand or interrupt an action.

{{< carousel label="Oversight and perceived-control results" images="/images/projects/human-oversight-adaptable-autonomy/oversight-results.webp|/images/projects/human-oversight-adaptable-autonomy/perceived-control-results.webp|/images/projects/human-oversight-adaptable-autonomy/timing-preference.webp" alts="Response distributions for questionnaire items covering causal power, epistemic access, self-control, and fitting intentions|Response distributions for questionnaire items about perceived behavioural control across TARS conditions|Participant preference plot comparing slow and fast TARS performer configurations" captions="Oversight was assessed through four complementary capabilities.|Perceived control varied with how work and intervention opportunities were distributed.|Preferences reveal different priorities for speed and temporal margin." >}}

## 09 — Adaptability supported individual strategies

The custom condition exposed substantial variation in how professional pilots wanted to work with the same autonomous teammate. Across 62 configurable choice tasks, participants delegated 68.6% of selections to TARS: 45.4% to the fast performer and 23.2% to the slower performer. Only 9.7% of tasks reached at least 80% agreement, while 43.5% had no majority choice.

That variation argues against a single fixed “best” allocation. The custom configuration also produced the lowest workload of the four conditions (mean 36.21), with strong perceived control and team-effectiveness ratings. The practical design direction may be task-sensitive timing combined with pilot-configurable allocation.

## 10 — Towards cognitive model validation

This HITLS reuses the same TARS, X-Plane, interface, scenario, and Ingescape services as the model-in-the-loop simulation framework, the only (big) difference is that a flesh and bones pilot interact with the setup in the HITLS whereas a cognitive model loaded inside QN-ACTR cognitive architecture takes the place of the pilot as another ingescape agent in MITLS. That shared infrastructure makes the datasets directly comparable while keeping the experimental system consistent.

The next phase will pilot behaviour and outcomes from this study with model-in-the-loop simulations to validate and refine the cognitive pilot model. 

The manuscript reporting this study is in preparation. Publication details will be added here once they are public.
