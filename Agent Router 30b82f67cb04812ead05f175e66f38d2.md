# Agent Router

```markdown
# Agent Router — Task Dispatch System

**Purpose:** Route tasks to the correct agent based on intent and context.

---

## Agent Registry

| Agent | Codename | Role | Location |
|-------|----------|------|----------|
| Lead Intelligence | **Scout** 🔍 | Find & enrich leads | `agents/lead-intelligence/` |
| Outreach Execution | **Sender** 📧 | Cold email campaigns | `agents/outreach/` |
| CRM Automation | **Nexus** 🔗 | Data sync & management | `agents/crm/` |
| Lead Nurture | **Cultivator** 🌱 | Follow-ups & relationships | `agents/nurture/` |
| Warm Outreach | **Connector** 🤝 | Referrals, inbound, warm leads | `agents/warm-outreach/` |

---

## Task → Agent Routing

### Lead Generation & Research

| Task | Agent | Tools |
|------|-------|-------|
| Find new leads | Scout | apify.sh, search.sh |
| Scrape agencies by city | Scout | apify.sh google-maps |
| Enrich lead with email | Scout | hunter.sh |
| Research competitor | Scout | search.sh, web_fetch |
| Find hiring signals | Scout | search.sh "hiring SDR" |
| Find competitor complaints | Scout | search.sh "lemlist frustrated" |

### Outreach & Email

| Task | Agent | Tools |
|------|-------|-------|
| Add lead to campaign | Sender | instantly.sh |
| Check campaign stats | Sender | instantly-sync.sh stats |
| Send cold email | Sender | instantly.sh |
| Write email sequence | Sender | (manual + VOICE.md) |
| Check warmup status | Sender | instantly.sh warmup |

### CRM & Data

| Task | Agent | Tools |
|------|-------|-------|
| Add lead to CRM | Nexus | notion.sh add-lead |
| Update lead status | Nexus | notion.sh update-lead |
| Add task | Nexus | notion.sh add-task |
| Add revenue | Nexus | db.js addRevenue |
| Add expense | Nexus | db.js addExpense |
| Sync Notion ↔ PostgreSQL | Nexus | sync-notion-db.js |
| Get pipeline stats | Nexus | db.js pipeline |
| Generate dashboard | Nexus | dashboard/api.js |

### Lead Nurture & Follow-up

| Task | Agent | Tools |
|----
```