# OUTPUT 1 — SYSTEM ARCHITECTURE

## OpenClaw Autonomous Company Stack

```
+============================================================+
|                    LAYER 7: GOVERNANCE                       |
|  Human Board  |  Approval Gates  |  Budgets  |  Audit Logs  |
+============================================================+
|                    LAYER 6: MEMORY & DATA                    |
|  Notion CRM (9 DBs)  |  Neon PostgreSQL  |  Redis Cache     |
+============================================================+
|                  LAYER 5: MARKETING ENGINE                   |
|  SEO Pipeline  |  Email Campaigns  |  Social  |  Content     |
+============================================================+
|                  LAYER 4: WEB AUTOMATION                     |
|  OpenClaw Browser  |  Apify Actors  |  Playwright Core       |
+============================================================+
|                 LAYER 3: ORCHESTRATION                       |
|  Cron Scheduler  |  Heartbeats  |  Task Queue  |  Events     |
+============================================================+
|                  LAYER 2: SKILL SYSTEM                       |
|  14 ClawdBot Skills  |  60+ OpenClaw Skills  |  ClawHub      |
+============================================================+
|              LAYER 1: AI ORGANIZATION                        |
|  CEO  |  CTO  |  Marketing  |  SEO  |  Research  |  Sales    |
+============================================================+
|                    FOUNDATION: OPENCLAW                       |
|  Gateway (port 18789)  |  Channels  |  Plugin SDK  |  CLI    |
+============================================================+
```

---

## Runtime Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Gateway** | OpenClaw 2026.2.27 (Node 22+) | Central agent runtime, cron, heartbeats |
| **Database** | Neon PostgreSQL | Analytics, historical data, agent memory |
| **CRM** | Notion API (9 databases) | Leads, outreach, revenue, tasks |
| **Cache** | Redis (localhost:6379) | Session state, rate limiting |
| **Email** | Instantly.ai API | Cold outreach campaigns |
| **Enrichment** | Hunter.io + Apify | Lead finding and enrichment |
| **Search** | Brave Search API | Competitive intel, research |
| **Channels** | Telegram, Discord, Slack, Web | Agent communication surfaces |
| **Browser** | OpenClaw Browser + Playwright | Web automation, scraping |
| **Skills** | ClawdBot skills/ + ClawHub | Modular agent capabilities |

---

## Data Flow

```
[Triggers: Cron / Heartbeat / Webhook / Chat Command]
         |
         v
[OpenClaw Gateway — Agent Router]
         |
    +----+----+----+----+----+
    |    |    |    |    |    |
  Scout Sender Nexus Cult. Conn.  (+ CEO, CTO, Marketing, SEO, Research, PM)
    |    |    |    |    |
    v    v    v    v    v
[Skill Execution Layer]
    |
    +---> Notion CRM (write leads, content, tasks)
    +---> Neon PostgreSQL (analytics, reports)
    +---> Instantly.ai (send campaigns)
    +---> Browser (scrape, research)
    +---> Telegram/Discord (notify human)
```

---

## Deployment Model

**Local-first with cloud data:**
- Gateway runs locally via Docker or native Node
- Databases are cloud-hosted (Neon, Notion)
- API keys stored in `.env` (never committed)
- Skills installed locally in `skills/` directory
- Cron jobs persist in `~/.openclaw/cron/`

**Production upgrade path:**
- Deploy gateway to Render.com via `render.yaml`
- Or self-host on any VPS with Docker
- Gateway port 18789, bridge port 18790

---

## Key Design Decisions

1. **OpenClaw-native, not a wrapper.** Uses OpenClaw's built-in cron, heartbeats, skills, and channels. No external orchestration framework needed.

2. **Skills over code.** Agent capabilities are packaged as OpenClaw skills (not raw scripts), making them portable and shareable via ClawHub.

3. **Human-in-the-loop by default.** All outbound comms (emails, social posts) route through Notion approval queue + Telegram notifications before sending.

4. **One agent = one job.** Agents have exclusive, non-overlapping responsibilities. The router dispatches, agents execute.

5. **Persistent memory.** Every agent decision, research finding, and campaign result is stored in PostgreSQL + Notion for audit and learning.
