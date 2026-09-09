---
title: "Human–Autonomy Teaming Flight-Deck Simulation Framework"
subtitle: ""
date: 2026-07-09
year: 2026
project_type: "Doctoral research · simulation framework"
status: "Ongoing research"
featured: true
story_layout: true
tags:
  - "Aviation Human Factors"
  - "Cognitive Modelling"
  - "Human–Autonomy Teaming"
  - "X-Plane"
role: "Doctoral researcher and system developer"
summary: "A closed-loop framework connecting a cognitive pilot model, the TARS cockpit agent, a shared interface, and X-Plane."
hero_image: "/images/projects/flight-deck-testbed/thumbnail-framework.png"
hero_alt: "Framework diagram connecting Interdependence Analysis and TARS with cognitive-model and human-pilot simulation loops"
hero_position: "center"
hero_fit: "contain"
external_url: ""
github_url: "https://github.com/BenjaminRBerton/TARS"
github_label: "View TARS source"
publication_url: "https://doi.org/10.1007/978-3-032-30427-8_20"
poster_url: "/images/projects/flight-deck-testbed/cognitive-model-poster.webp"
slides_url: "/documents/hcii-2026/cognitive-modelling-framework-hcii-2026-slides.pdf"
related_publications:
  - "cognitive-modelling-framework"
  - "human-autonomy-teaming-future-commercial-aviation"
related_conferences:
  - "hcii-2026"
  - "iccm-2026"
related_projects:
  - "human-oversight-adaptable-autonomy"
---

This framework supports rapid, model-in-the-loop exploration of human–autonomy teaming concepts early in the design process before committing to costly human-in-the-loop studies. It connects a cognitive model of a pilot, an autonomous cockpit agent, and a flight simulator in one observable experimental environment.

It was presented at HCII 2026 in *A Cognitive Modelling Framework for Simulating Human–Autonomy Teaming in the Flight Deck*.

## 01 — The allocation problem

Imagine designing an autonomous agent to fly alongside a single pilot. Once the agent's technical capabilities are defined, a persistent design question appears: who should be responsible for each flight-deck function?

Interdependence Analysis turns this into a design space. For any task, the human may perform with or without agent support, or the agent may perform with or without human support. As capability coverage overlaps, the number of admissible configurations grows quickly.

{{< image src="/images/projects/flight-deck-testbed/workflow.gif" alt="Animated workflow comparing human-performer and TARS-performer allocations across takeoff tasks" caption="Expanding the tree of allocation alternatives generated from Interdependence Analysis: TARS as supporter or as performer." >}}

> The interesting designs can be between the extremes of “pilot alone” and “maximum automation.” Exploring those subtle allocations is important for adaptable automation that adapts to the variability of operational context.

## 02 — Why simulate before testing?

Design requires trying alternatives, observing their effects, and refining them. In safety-critical aviation research, that empirical loop is difficult to run at the scale of the design space, because Human-In-The-Loop experiments are:

- **Costly:** high-fidelity simulators, instrumentation, engineering support, and participant compensation.
- **Slow:** qualified pilots are difficult to recruit, and a single experimental session can last about four hours while covering only a few conditions.
- **Rigid:** controlled studies deliberately hold aircraft configuration, failures, timing, weather, traffic, and navigation constant to avoid confounds. That limits coverage of real operational variability.

The framework aims to shorten the path from a function-allocation decision to evidence about its likely consequences. It should be thought of as an early evaluation/exploration layer, ---not a replacement for studies with pilots---, which are needed anyway for initial model validation.

## 03 — A modular, closed-loop framework

The framework connects four principal components:

1. **X-Plane 11**, which provides the aircraft and operational environment through NASA's XPlaneConnect API.
2. **A QN-ACTR pilot model**, which perceives the simulated flight deck and acts on both the aircraft and the shared interface.
3. **TARS and its interface**, which support or perform allocated takeoff tasks.
4. **Experiment and analysis services**, which configure allocations, run simulation batches, log network activity in Apache Cassandra, and analyse results.

{{< image src="/images/projects/flight-deck-testbed/framework-overview.webp" alt="HCII presentation diagram showing the cognitive pilot model, X-Plane simulator, TARS, and shared interface connected in a closed loop" caption="The closed-loop architecture presented at HCII 2026." >}}

The components expose their inputs, outputs, and internal states over the network. Because the architecture is modular, the cognitive model can be exchanged for a human pilot while retaining the agent, interface, scenario, and logging infrastructure.

## 04 — How to build a cognitive pilot

In order to have a computational cognitive model of a human pilot's mind. We rely on the ACT-R cognitive architecture. ACT-R (Adaptive Control of Though-Rational) is both a theory of cognition and an executable computer program that a modeler can use to create a cognitive model. The pilot model runs in QN-ACTR. A Queuing-Network extension of ACT-R, made for multitask performance. The model contains the declarative and procedural knowledge required for the scenario.

Its knowledge base was developed from operational documentation and training material. A Hierarchical Task Analysis was reviewed with three expert pilots, and teaming requirements from Interdependence Analysis were used to represent each task under different performer and supporter allocations.

{{< image src="/images/projects/flight-deck-testbed/cognitive-model-development.webp" alt="HCII presentation diagram linking operational documents, expert validation, and Interdependence Analysis to ACT-R knowledge" caption="Operational sources, expert review, and teaming requirements inform the executable pilot model." >}}

The interaction model encodes several findings from human–automation research:

- Delegation changes cognitive work from execution toward supervision and verification; it does not simply remove work.
- The model may supervise and cross-check delegated actions or continue with other cockpit tasks.
- Support is integrated opportunistically; the pilot continues independently when assistance has not yet arrived.
- An initial verification-propensity parameter represents individual differences in trust in automation.
- Experience with reliable or unreliable automation changes later verification behaviour.
- A SEEV-based mechanism directs visual attention among areas of interest in the visual scene (cockpit + external environment).

These mechanisms are intended to reproduce recognizable signatures of human–automation interaction, including adaptive reliance, complacency, and distrust after automation failures.

## 05 — TARS, the autonomous teammate

The Takeoff Autonomous Resilience System (TARS) is our in-house developed autonomous flight-deck agent. It is implemented as a reactive finite-state machine in Python and can support or perform tasks during takeoff.

**The public TARS repository contains this agent source code** Task-allocation files tell TARS whether to do nothing, support, or perform for each task, and whether an action should be immediate or delayed.

TARS can read aircraft state, manipulate the electronic checklist, monitor cockpit switches, interact with selected avionics, and communicate through voice and text. Its shared interface presents task and agent state, allocation, upcoming actions, task-specific cues, and intervention controls.

{{< gallery fit="contain" columns="1" images="/images/projects/flight-deck-testbed/TARS_interface_video_trimmed.gif|/images/projects/flight-deck-testbed/simulator-setup.webp" alts="TARS shared interface showing flight context, task allocation, agent controls, and scenario settings|Polytechnique Montréal flight simulator with the TARS touchscreen installed beside the left seat" captions="The TARS shared interface.|The same agent and interface can be used in a human-in-the-loop setup." >}}

## 06 — The framework's parameters

The framework exposes parameters at three levels so that design alternatives and operating contexts can be varied systematically.

### Cognitive pilot

- Timing for manual cockpit actions
- Initial verification propensity, from always verify to never verify
- Reward weights that adapt verification after correct or incorrect agent actions
- SEEV saliency, expectation, effort, and value parameters

### Autonomous teammate

- Function allocation: nothing, support, or perform for each task
- Immediate or delayed action timing
- Text or speech interaction
- Per-task action reliability

### Flight context

- Weather, navigation, traffic, failures, and other X-Plane scenario variables

Together, these controls allow simulation batches to cover allocations and contexts that would be impractical to examine one by one with human participants.

## 07 — The framework's outputs

The framework records complementary outcomes:

- **Team level:** Joint Activity Efficiency and coordination overhead
- **Task and scenario:** time on task, detected and undetected automation errors, and aviate–navigate–communicate–manage performance
- **Team process:** intervention and communication frequency, interaction modality, and attention to the shared interface
- **Human cognition:** QN-ACTR workload estimates, production-utility measures of reliance, and predicted visual attention

{{< image src="/images/projects/flight-deck-testbed/model-scanpath.webp" alt="Model-predicted cockpit scanpath with coloured attention transitions between flight-deck areas of interest" caption="A model-predicted visual scanpath during pre-takeoff." >}}

{{< image src="/images/projects/flight-deck-testbed/model-workload.gif" alt="Animated chart revealing perceptual, cognitive, motor, and overall QN-ACTR utilization across the pre-takeoff procedure" caption="Predicted workload in real-time during the takeoff scenario for different submodules." >}}

{{< image src="/images/projects/flight-deck-testbed/adaptive-reliance.gif" alt="Animated production-utility chart showing verification propensity changing after an unreliable TARS action" caption="A simulated automation failure changes the model's later propensity to cross-check delegated actions." >}}

## 08 — From model-in-the-loop to pilots

The initial model-in-the-loop campaign ran 12 real-time simulations across two allocation conditions and two TARS timing settings. The framework completed the runs, logged the intended outputs, and produced distinct patterns across conditions.

The same scenario was subsequently evaluated with 18 professional pilots in Polytechnique Montréal's flight simulator. Four configurations were compared:

1. TARS supports but does not perform tasks.
2. TARS performs wherever possible, with five-second delays around actions.
3. TARS performs wherever possible without those delays.
4. Each participant configures allocation and delays across the scenario's 85 tasks before flying.

{{< gallery fit="contain" columns="1" images="/images/projects/flight-deck-testbed/validation-time-on-task.png|/images/projects/flight-deck-testbed/validation-visual-attention.png" alts="Boxplots comparing model and human procedure duration across TARS allocation conditions|Bar chart comparing model-predicted and pilot visual attention across flight-deck areas of interest" captions="Early time-on-task comparison.|Early comparison of model and human visual-attention allocation." >}}

Validation is ongoing. Current targets include time on task, visual attention, and workload, followed by cross-check rate, Joint Activity Efficiency, and flight performance. The next development step is to extend the cognitive model from the currently modelled procedures to the full scenario and run the pilot-configured allocations.

## 09 — Publication, slides, and poster

The complete research argument and implementation are described in the peer-reviewed [HCII 2026 publication](https://doi.org/10.1007/978-3-032-30427-8_20). You can also view the [conference slides](/documents/hcii-2026/cognitive-modelling-framework-hcii-2026-slides.pdf) or the [research poster](/images/projects/flight-deck-testbed/cognitive-model-poster.webp) presented at the International Conference on Cognitive Modelling.

### Open components source code

- [TARS autonomous flight-deck agent](https://github.com/BenjaminRBerton/TARS)
- [QN-ACTR human–autonomy model](https://github.com/BenjaminRBerton/QN-ACTR_HAT)