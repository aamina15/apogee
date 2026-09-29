
# 🛰️ Apogee

**An evidence-driven learning navigator.**
*Turn any free-text goal into a prerequisite-locked, hour-budgeted learning route — built from real, live web resources, explained end to end, and backed by proof, not self-report.*

## What is Apogee?

Most learning recommenders either hand you a fixed course catalogue, or generate a plan they can't explain and can't prove you actually learned anything from. Apogee is built to do neither.

Given a goal in plain English — *"become a machine learning engineer with 10 hours a week"* — Apogee:

1. Derives a **skill graph**: what you need to know, at what level, and in what order.
2. Grounds skill importance in **live job-market demand**, not just model opinion.
3. Discovers **real resources from the live web** — no hallucinated courses, no dead links.
4. Builds a **phased, hour-budgeted route** that never violates a prerequisite and never exceeds your weekly hours.
5. Explains every recommendation — and every rejection — using only auditable reason codes.
6. Verifies what you actually learned through **proof of skill**, not self-reported checkboxes.
7. Keeps you on track over weeks: mastery **decays realistically**, missed sessions trigger a gentle re-plan, and reviews get scheduled before you forget.

Apogee is the next evolution of an earlier project, **Orbit**, and keeps all of Orbit's core guarantees while adding accounts, market grounding, verified evidence, and durable adaptive coaching.

---

## Why

- Fixed course catalogues only cover roles someone thought to type in advance.
- Most recommenders can't explain themselves or prove a route is actually valid.
- Learners self-report skill levels, forget what they learned, fall behind, and get no adaptive help.
- Skill importance is usually just a model's opinion — not grounded in what employers are actually asking for.

## Core Guarantees

Apogee is built around a small set of guarantees that are tested, not just claimed:

- ✅ **Zero prerequisite violations** — nothing is recommended before its prerequisites are actually met.
- ✅ **Hour budget never exceeded**, across every route.
- ✅ **Monotonic readiness** — more study time never *lowers* projected readiness.
- ✅ **No repeats** — rejected or completed resources never resurface (scheduled reviews are the one deliberate exception, and are clearly labelled as such).
- ✅ **Every explanation is auditable** — prose is generated only from emitted reason codes, never invented on the spot.
- ✅ **No fabricated resources** — every URL comes from a real search result.
- ✅ **Honest failure** — if a valid route can't be built, Apogee says so instead of quietly falling back to filler content.
- ✅ **The graph is provably acyclic** — validated on generation, with automatic repair if the model ever proposes a circular dependency.

## Features

### Core
- **Free-text goal intake** with hours/week, weeks, budget, and format constraints
- **LLM-derived skill graph**: skills, target levels, importance weights, prerequisite DAG
- **Live resource discovery** via concurrent web search, typed and validated
- **Adaptive skill diagnostic** with a real-time-updating mastery vector
- **Importance-weighted gap analysis**
- **Reason-coded retrieval and scoring**
- **Budgeted planner**: set cover → topological sort → phased route
- **Explainer** and **why-not counterfactuals**, both derived only from emitted reason codes
- **Feedback loop**: complete/reject signals trigger a re-plan, logged as a route-change receipt
- **What-if simulator** over hours/weeks
- **Dashboard**: readiness, gaps, progress, next actions
- **Grounded chat**, answering only from the learner's own route data
- **Mission profiles** for a fast, one-click start

### What Apogee adds beyond Orbit
| Feature | What it does |
| --- | --- |
| 🎯 **Market Pulse** | Blends live job-posting demand into skill importance weights, with source count and date shown |
| 🧾 **Proof of Skill** | Learners submit real evidence (repo, deployed URL, written summary), graded against a visible rubric |
| 🔁 **Retention Engine** | Mastery decays over time; short reviews are scheduled before a skill drops below its threshold |
| 📅 **Calendar Sync & Smart Re-plan** | Missed sessions trigger a gentle re-plan and a lighter-week mode, not guilt |
| 🔗 **Resource Trust Score** | Every resource is scored on link health, recency, authority, and cross-source agreement; dead links auto-swap |
| 📊 **Readiness Confidence Bands** | Readiness is always a range, narrowing as evidence accumulates — never a false-precision single number |
| 🕸️ **Completion Graph** | An interactive, computed (never hand-drawn) DAG of skills and courses, with real completion state |
| 📄 **Career Output Pack** | Exportable PDF of verified skills, projects, resume bullets, and a readiness report |
| 👥 **Cohort Mode** | Shared routes and progress for study groups and classes |
| 🔐 **Accounts & Durable Storage** | Server-side profiles with cross-device sync |
| 🌐 **Language & Cost Filters** | Free-only, budget-capped, and language-preferred resource filtering |

## How completion actually works

A resource in Apogee moves through three explicit states:

```
Opened → Completed (self-marked) → Verified (quiz or proof passed)
```

Only a **Verified** state unlocks dependent skills and resources by default — self-marking something "done" tracks your progress, but it doesn't satisfy a downstream prerequisite on its own. This keeps the "zero prerequisite violations" guarantee meaningful even when learners are honest-but-optimistic about their own completion.

## Architecture

```
goal text → intake → goal graph (LLM) → acyclic validation ─┐
                                                              ├→ Market Pulse blend (job postings)
discovery (search) → typed resources → trust scoring ────────┘
   → profiler (claims + diagnostic + proofs + decay)
   → gap → retrieval (reason codes) → planner (set cover → topo sort → phases)
   → explainer (from reason codes only) → dashboard / completion graph / calendar / export
```

**Design principle carried over from Orbit:** the model derives graphs and labels resources; deterministic code decides the route. The LLM never gets to skip the planner.

**Suggested stack:**
- Backend: FastAPI
- Graph derivation & labelling: Gemini
- Discovery: a web search API
- Storage: Postgres / Supabase
- Background worker: link-health checks, review reminders
- Frontend: single-page app
- Hosting: Vercel + managed DB

## Roadmap

| Phase | Scope |
| --- | --- |
| **Phase 1 (MVP)** | Core features, Completion Graph & Course Launch, Accounts & Storage, Resource Trust Score, Confidence Bands, and a lightweight quiz-only slice of Proof of Skill |
| **Phase 2** | Full Market Pulse, full Proof of Skill (evidence + rubric grading + dispute), Retention Engine |
| **Phase 3** | Calendar Sync, Career Output Pack, Language/Cost Filters |
| **Phase 4** | Cohort Mode, mentor dashboard |

## Non-Goals (v1)

- Hosting course content ourselves
- Payments or a course marketplace
- Native mobile apps (responsive web first)
- Gamification that pressures the learner (no streak counters, no guilt-based framing)
- Claiming capabilities that aren't shipped yet in the current phase

## Documentation

- 📋 [Full Product Requirements Document](./apogee-prd.md) — problem statement, complete feature set, functional requirements, data model, API, roadmap, and open questions

## Status

Apogee is currently in the design and planning stage — PRD finalized, frontend concepts in review. Contribution guidelines and setup instructions will be added once the initial scaffold lands.

---

<div align="center">
<sub>Apogee — the highest point of an orbit.</sub>
</div>
