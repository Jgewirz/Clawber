# OptAImum — OpenClaw Autonomous Company Stack

## 13 AI Agents. 15 Cron Jobs. One Self-Managing Business.

Built on OpenClaw 2026.2.27 + your existing Clawdbot skills + Brain agent definitions.

---

## Architecture Summary

```
HUMAN (Jack) — Board of Directors
    |
    CLAW (CEO) — Daily 7AM briefing
    ├── FORGE (CTO) — System health
    │   ├── NEXUS — CRM & data (hourly sync)
    │   ├── SENTINEL — Ops monitor (every 6h)
    │   └── COMPASS — Product roadmap (weekly)
    │
    └── AMPLIFY (CMO) — Marketing coordination
        ├── SCOUT — Lead intelligence (every 30min)
        ├── SENDER — Cold outreach (9AM/5PM weekdays)
        ├── CULTIVATOR — Follow-ups (10AM weekdays)
        ├── CONNECTOR — Warm outreach (on-demand)
        ├── RANKER — SEO (Wednesday)
        ├── SCRIBE — Content (Mon/Thu)
        ├── HERALD — Social (Tue/Thu)
        └── ORACLE — Research (Mon/Thu)
```

---

## Quick Start

```bash
# 1. Set up environment
cp .env.example .env  # Edit with your API keys

# 2. Run bootstrap
bash bootstrap-optaimum.sh

# 3. Verify
openclaw cron list
openclaw channels status --probe
```

---

## Documents

| # | File | What It Covers |
|---|------|---------------|
| 01 | [System Architecture](01_SYSTEM_ARCHITECTURE.md) | 7-layer stack, data flow, runtime |
| 02 | [Agent Org Chart](02_AGENT_ORG_CHART.md) | Hierarchy, reporting, interaction rules |
| 03 | [Agent Configs](03_AGENT_CONFIGS.md) | YAML configs for all 13 agents |
| 04 | [Orchestration Workflows](04_ORCHESTRATION_WORKFLOWS.md) | 5 end-to-end workflows + cron schedule |
| 05 | [Browser Automation](05_BROWSER_AUTOMATION.md) | Playwright + Apify integration |
| 06 | [Skill Module System](06_SKILL_MODULE_SYSTEM.md) | 14 installed + 5 new skills to build |
| 07 | [Marketing Engine](07_MARKETING_ENGINE.md) | Growth flywheel, email pipeline, social |
| 08 | [Deployment Structure](08_DEPLOYMENT_STRUCTURE.md) | Directory layout, Docker, Render, bootstrap |
| 09 | [Scaling Plan](09_SCALING_PLAN.md) | 13 -> 100+ agents in 5 phases |
| 10 | [Cost Control](10_COST_CONTROL.md) | Token budgets, API costs, ROI tracking |

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Agents | 13 (expandable to 100+) |
| Cron Jobs | 15 scheduled |
| Skills | 14 installed + 5 planned |
| Daily Token Budget | 500K tokens (~$7.50/day) |
| Monthly Cost | ~$262 |
| Break-even | 1 client at $262+/month |
| Target Lead Volume | 50+/week |
| Target Content | 4 articles + 5 social posts/week |

---

## Existing Assets Integrated

- **Brain/** — 5 agent specs (Scout, Sender, Nexus, Cultivator, Connector) + voice/brand/playbooks
- **Clawdbot/** — 14 installed skills + 15 cron job templates
- **openclaw-extracted/** — OpenClaw v2026.2.27 gateway + 60+ skills + 40+ extensions
- **Notion CRM** — 9 databases already configured with IDs
- **APIs** — Hunter.io, Apify, Brave Search, Instantly.ai, Neon PostgreSQL all configured

---

*Architecture designed March 2026. Built for OptAImum on OpenClaw.*
