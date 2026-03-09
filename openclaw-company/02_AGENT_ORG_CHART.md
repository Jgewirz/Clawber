# OUTPUT 2 — AGENT ORG CHART

## Organizational Hierarchy

```
                        +------------------+
                        |   HUMAN BOARD    |
                        | (You — Jack)     |
                        | Approval gates   |
                        | Budget authority  |
                        +--------+---------+
                                 |
                        +--------+---------+
                        |    CEO_AGENT     |
                        |  Codename: CLAW  |
                        |  Strategy & Goals |
                        +--------+---------+
                                 |
              +------------------+------------------+
              |                                     |
     +--------+---------+               +-----------+---------+
     |    CTO_AGENT     |               |  MARKETING_AGENT    |
     | Codename: FORGE  |               | Codename: AMPLIFY   |
     | Tech & Infra     |               | Growth & Brand      |
     +--------+---------+               +-----------+---------+
              |                                     |
     +--------+--------+            +---------+-----+--------+---------+
     |                  |            |         |              |         |
+----+----+    +--------+--+   +----+----+ +--+------+ +-----+---+ +---+------+
| OPS     |    | PRODUCT   |   | SEO     | | CONTENT | | SOCIAL  | | RESEARCH |
| AGENT   |    | MANAGER   |   | AGENT   | | AGENT   | | AGENT   | | AGENT    |
| Monitor |    | Roadmap   |   | Ranking | | Writing | | Posting | | Intel    |
+---------+    +-----------+   +---------+ +---------+ +---------+ +----------+
```

### Executive Layer

```
+---------+------+-----+---+
| Agent         | CLAW     |
| Role          | CEO      |
| Reports To    | Human    |
| Heartbeat     | Daily 7AM|
| Responsibilities:        |
| - Company goal setting   |
| - Strategy approval      |
| - Daily briefing         |
| - Cross-agent priorities |
| - Budget allocation      |
+---------+------+-----+---+
```

### Department Heads

| Agent | Codename | Dept | Reports To | Heartbeat |
|-------|----------|------|-----------|-----------|
| CTO | **FORGE** | Engineering | CLAW | Daily 8AM |
| CMO | **AMPLIFY** | Marketing | CLAW | Daily 8AM |

### Operational Agents (Sales Team — Already Built)

| Agent | Codename | Team | Reports To | Heartbeat |
|-------|----------|------|-----------|-----------|
| Lead Intelligence | **SCOUT** | Sales | AMPLIFY | Every 30min |
| Cold Outreach | **SENDER** | Sales | AMPLIFY | 9AM/5PM |
| Warm Outreach | **CONNECTOR** | Sales | AMPLIFY | On-demand |
| Lead Nurture | **CULTIVATOR** | Sales | AMPLIFY | 10AM daily |
| CRM & Data | **NEXUS** | Operations | FORGE | Continuous |

### New Agents (To Build)

| Agent | Codename | Team | Reports To | Heartbeat |
|-------|----------|------|-----------|-----------|
| SEO | **RANKER** | Marketing | AMPLIFY | Wed 10AM |
| Content | **SCRIBE** | Marketing | AMPLIFY | Mon/Thu 8AM |
| Social Media | **HERALD** | Marketing | AMPLIFY | Tue/Thu 8AM |
| Research | **ORACLE** | Strategy | CLAW | Mon/Thu 2PM |
| Product Manager | **COMPASS** | Product | FORGE | Weekly Mon 9AM |
| Operations | **SENTINEL** | Ops | FORGE | Every 6 hours |

---

## Reporting Structure

### Daily Reports (Automated)
```
SCOUT    --> AMPLIFY  (lead count, quality scores)
SENDER   --> AMPLIFY  (campaign metrics, response rates)
NEXUS    --> FORGE    (data health, sync status)
SENTINEL --> FORGE    (uptime, error counts)
AMPLIFY  --> CLAW     (marketing summary)
FORGE    --> CLAW     (ops summary)
CLAW     --> HUMAN    (morning briefing via Telegram)
```

### Weekly Reports (Friday 5PM)
```
ALL AGENTS --> NEXUS (aggregate metrics)
NEXUS --> CLAW (weekly revenue report)
CLAW --> HUMAN (full business report via Telegram + Notion)
```

---

## Agent Interaction Rules

1. **Agents never bypass their chain of command.** SCOUT reports to AMPLIFY, not directly to CLAW.
2. **Cross-department requests go through department heads.** If RANKER needs data from NEXUS, the request routes AMPLIFY -> FORGE -> NEXUS.
3. **Exception: NEXUS is shared infrastructure.** Any agent can read from NEXUS (CRM queries). Only NEXUS can write to CRM.
4. **Human override is always available.** Any Telegram message from Jack can redirect any agent immediately.
