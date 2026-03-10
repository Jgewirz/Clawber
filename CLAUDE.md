# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

OptAImum — an autonomous AI company stack built on OpenClaw 2026.2.27. This is a **specification and orchestration repository**, not a traditional codebase. It defines 13 AI agents, 15 cron jobs, brand voice, sales playbooks, and operational procedures for a self-managing business that sells AI-powered sales optimization.

The actual runtime code lives in sister directories:
- `Clawdbot/` — Installed skills and runtime configuration
- `openclaw-extracted/` — OpenClaw core gateway, cron scheduler, browser automation

## Architecture (Three Layers)

```
Strategic Layer (this repo - Brain/)
  └── Agent definitions, brand voice, playbooks, identity docs

Execution Layer (Clawdbot/)
  └── 14 installed skills, cron job templates, runtime config

Infrastructure Layer (openclaw-extracted/)
  └── OpenClaw gateway, Node 22+, Playwright, Docker
```

### Agent Hierarchy

```
HUMAN (Jack) — Board of Directors
  └── CLAW (CEO) — Daily 7AM briefing
      ├── FORGE (CTO)
      │   ├── NEXUS — CRM & data sync (hourly)
      │   ├── SENTINEL — Ops monitor (every 6h)
      │   └── COMPASS — Product roadmap (weekly)
      └── AMPLIFY (CMO)
          ├── SCOUT — Lead intelligence (every 30min)
          ├── SENDER — Cold outreach (9AM/5PM weekdays)
          ├── CULTIVATOR — Follow-ups (10AM weekdays)
          ├── CONNECTOR — Warm outreach (on-demand)
          ├── RANKER — SEO (Wednesday)
          ├── SCRIBE — Content (Mon/Thu)
          ├── HERALD — Social (Tue/Thu)
          └── ORACLE — Competitive research (Mon/Thu)
```

## Repository Structure

### `openclaw-company/` — Architecture Docs (the core reference)
10 numbered docs (`01_SYSTEM_ARCHITECTURE.md` through `10_COST_CONTROL.md`) plus 3 shell scripts:
- `bootstrap-optaimum.sh` — Registers all 15 cron jobs with OpenClaw
- `start-optaimum.sh` — Full startup orchestration
- `health-check.sh` — Diagnostic health check

### Root Markdown Files — Notion-Exported Agent Specs
13 files with hex-suffix naming (e.g., `Scout - Lead Intelligence 30b82f67cb048150b84ff9259272f9a1.md`). These define individual agent behaviors, the CRM system, sales/hunting playbooks, brand voice, channel strategy, and routing rules.

### `voice.txt` — Brand voice quick reference
5 principles: Confident not arrogant, Direct & action-oriented, Numbers-driven, Specific, Empathetic.

## Key Commands

```bash
# Bootstrap: register all 15 cron jobs
bash openclaw-company/bootstrap-optaimum.sh

# Start the full stack
bash openclaw-company/start-optaimum.sh

# Health check
bash openclaw-company/health-check.sh

# Verify cron registration
openclaw cron list
openclaw channels status --probe
```

## External Services

- **Notion** — CRM with 9 databases (leads, content calendar, tasks, revenue, expenses)
- **Hunter.io** — Email enrichment for SCOUT agent
- **Apify** — Web scraping for lead intelligence
- **Instantly.ai** — Cold email campaigns for SENDER agent
- **Brave Search** — Web research for ORACLE agent
- **Neon PostgreSQL** — Analytics and agent memory
- **Redis** — Session state and rate limiting
- **Telegram** — Agent notifications

## Brand Voice Rules (enforced across all agent output)

- Always use specific numbers, never vague claims ("28% increase" not "significant growth")
- Lead with results, not features
- Banned words: synergy, leverage, utilize, paradigm, holistic, ecosystem
- Tagline: "Stop Leaks. Start Scaling."
- Guarantee: "30-day measurable ROI or your money back"
- Target audience: Sales teams losing 10-20% revenue to inefficiency

## Cost Constraints

- Daily token budget: 500K tokens (~$7.50/day)
- Monthly target: ~$262
- Break-even: 1 client at $262+/month

## Commit Style

```
feat: Add new JSONB feature extraction
fix: Correct data leakage in spread model
docs: Update README with new endpoints
```
