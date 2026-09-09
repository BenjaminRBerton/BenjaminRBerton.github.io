---
title: "Interdependence Analysis Dashboard"
subtitle: "An interactive tool for modelling and evaluating human–autonomy teams."
date: 2026-06-01
year: 2025
project_type: "Research software"
status: "Open source · active development"
featured: true
tags:
  - "Human–Autonomy Teaming"
  - "Coactive Design"
  - "Plotly Dash"
  - "Python"
role: "Designer and developer"
summary: "A web editor and visual-analysis environment that helps researchers apply Interdependence Analysis without relying on spreadsheets."
hero_image: "/images/projects/interdependence-analysis/ia_table.gif"
hero_alt: "Interdependence Analysis application showing the analysis table and workflow graph"
hero_position: "center"
hero_fit: "contain"
external_url: "https://huggingface.co/spaces/Bertonlome/Interdependence-Analysis"
external_label: "Launch Live Demo"
github_url: "https://github.com/BenjaminRBerton/Interdependence-Analysis-Table"
publication_url: ""
related_publications:
  - "human-autonomy-teaming-future-commercial-aviation"
related_conferences:
  - "aspire-2026"
related_projects:
  - "human-oversight-adaptable-autonomy"
---

## Description

Interdependence Analysis is a method within Coactive Design for reasoning about joint activity. It asks what each teammate can perform, where support is required or beneficial, and what must be observable, predictable, or directable for the team to coordinate effectively.

Instead of maintaining a large spreadsheet, or use freehand tools. A researcher can use the dashboard and load an analysis from CSV, edit capacities and allocations in the browser, document coordination requirements, and review visual summaries of the resulting team design.

## What it supports

- Parametric team configurations from imported CSV files
- Cell-by-cell editing of performer and supporter capacities
- Structured observability, predictability, and directability requirements
- Capacity summaries and interdependence visualizations
- Automation-proportion metric
- CSV import and export 

## Interface examples

The dashboard separates team configuration, capacity assessment, and workflow analysis into focused views. 

{{< carousel label="Interdependence Analysis interface examples" images="/images/projects/interdependence-analysis/screenshot-ia-header.png|/images/projects/interdependence-analysis/screenshot-ia-table.png|/images/projects/interdependence-analysis/screenshot-ia-workflow.png" alts="Interdependence Analysis dashboard showing the active team configuration, activity hierarchy, team members, and alternatives|Interdependence Analysis table showing task decomposition, capacity assessments, teaming requirements, and allocation roles|Interdependence Analysis workflow graph comparing task dependencies across two human–autonomy team alternatives" captions="Team configuration and allocation alternatives.|Detailed capacity, allocation, and teaming-requirement table.|Workflow graph for comparing dependencies across team alternatives." >}}

## Implementation

I designed and implemented the application in Python using Plotly Dash, Pandas, and Plotly. A Docker deployment is maintained for Hugging Face Spaces.