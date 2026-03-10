# OUTPUT 8 — DEPLOYMENT STRUCTURE

## Directory Layout

```
C:\Users\jgewi\Desktop\
│
├── Brain/                              # STRATEGIC LAYER (Agent Brains)
│   ├── IDENTITY md ....md              # Claw identity
│   ├── VOICE md ....md                 # Brand voice
│   ├── TOOLS md ....md                 # API keys & infra
│   ├── Agent Router ....md             # Task routing rules
│   ├── Agent Dispatch ....md           # Agent responsibilities
│   ├── Control Room ....md             # Dashboard links
│   ├── Brand Voice (Full) ....md       # Full brand guidelines
│   ├── Sales Playbook ....md           # Sales execution
│   ├── Hunting Playbook ....md         # Lead discovery
│   ├── Competitive Intel ....md        # Research protocols
│   ├── Channel Strategy ....md         # Multi-channel strategy
│   ├── Scout ....md                    # Scout agent spec
│   ├── Sender ....md                   # Sender agent spec
│   ├── Nexus ....md                    # Nexus agent spec
│   ├── Cultivator ....md               # Cultivator agent spec
│   ├── Connector ....md                # Connector agent spec
│   ├── voice.txt                       # Quick voice reference
│   ├── docker-compose.yml             # MASTER DOCKER COMPOSE
│   ├── .env.example                   # Environment template
│   │
│   ├── openclaw-company/              # Architecture Docs
│   │   ├── 01_SYSTEM_ARCHITECTURE.md
│   │   ├── 02_AGENT_ORG_CHART.md
│   │   ├── 03_AGENT_CONFIGS.md
│   │   ├── 04_ORCHESTRATION_WORKFLOWS.md
│   │   ├── 05_BROWSER_AUTOMATION.md
│   │   ├── 06_SKILL_MODULE_SYSTEM.md
│   │   ├── 07_MARKETING_ENGINE.md
│   │   ├── 08_DEPLOYMENT_STRUCTURE.md
│   │   ├── 09_SCALING_PLAN.md
│   │   └── 10_COST_CONTROL.md
│   │
│   └── integrations/                  # INTEGRATION CONFIGS
│       ├── paperclip/                 # Governance control plane
│       │   ├── README.md
│       │   └── company-seed.json      # 13 agents, org hierarchy, budgets
│       ├── agent-orchestrator/        # Event-driven orchestration
│       │   ├── README.md
│       │   ├── agent-orchestrator.yaml
│       │   └── phase-mapping.md
│       ├── pinchtab/                  # Browser automation
│       │   └── README.md
│       ├── pm-skills/                 # 65 PM skills
│       │   ├── README.md
│       │   └── agent-skill-mapping.yaml
│       ├── geo-seo/                   # 11 GEO/SEO skills
│       │   ├── README.md
│       │   └── python-deps.txt
│       └── prompts-chat/              # Prompt optimization
│           └── README.md
│
├── Clawdbot/                          # EXECUTION LAYER (Runtime)
│   ├── .clawdhub/
│   │   └── clawdbot.json              # MCP server configs
│   ├── skills/                        # Installed skill modules (14 core)
│   │   ├── agent-content-pipeline/
│   │   ├── calendar/
│   │   ├── clawpify/
│   │   ├── content-ideas/
│   │   ├── gmail/
│   │   ├── gmail-inbox-zero-triage/
│   │   ├── instagram-marketing/
│   │   ├── lead-generation/
│   │   ├── linkedin/
│   │   ├── sales/
│   │   ├── seo/
│   │   ├── seo-competitor-analysis/
│   │   ├── shopify-admin-api/
│   │   └── twitter/
│   ├── .env.example
│   ├── OPTAIMUM_AUTOMATION_SETUP.md
│   └── Control Room ....md
│
├── openclaw-extracted/                # INFRASTRUCTURE LAYER (OpenClaw Core)
│   └── openclaw-main/
│       ├── src/                       # Core gateway source
│       ├── skills/                    # Bundled skills (60+)
│       ├── extensions/                # Channel extensions (40+)
│       ├── docs/
│       ├── docker-compose.yml
│       ├── render.yaml
│       ├── Dockerfile
│       └── package.json               # v2026.2.27
│
│ === NEW INTEGRATION REPOSITORIES ===
│
├── paperclip/                         # GOVERNANCE LAYER
│   ├── server/                        # Paperclip API server
│   ├── doc/                           # OPENCLAW_ONBOARDING.md
│   ├── Dockerfile
│   └── package.json
│
├── agent-orchestrator/                # EVENT-DRIVEN ORCHESTRATION
│   ├── packages/
│   │   ├── cli/                       # 'ao' CLI
│   │   ├── core/                      # Types, config, sessions
│   │   ├── web/                       # Next.js dashboard
│   │   └── plugins/                   # 15+ plugins (inc. notifier-openclaw)
│   └── package.json
│
├── pinchtab/                          # BROWSER AUTOMATION
│   ├── cmd/pinchtab/                  # Go binary source
│   ├── plugin/                        # OpenClaw plugin
│   ├── skill/pinchtab/                # Skill definition
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── pm-skills/                         # 65 PM SKILLS (8 plugins)
│   ├── pm-product-discovery/
│   ├── pm-product-strategy/
│   ├── pm-execution/
│   ├── pm-market-research/
│   ├── pm-data-analytics/
│   ├── pm-go-to-market/
│   ├── pm-marketing-growth/
│   └── pm-toolkit/
│
├── geo-seo-claude/                    # 11 GEO/SEO SKILLS
│   ├── geo/                           # Master orchestrator
│   ├── skills/                        # 11 sub-skills
│   ├── agents/                        # 5 parallel subagents
│   ├── scripts/                       # Python utilities
│   └── requirements.txt
│
├── prompts.chat/                      # PROMPT OPTIMIZATION
│   └── (community prompt library + MCP server)
│
└── ~/.openclaw/                       # RUNTIME STATE (Auto-managed)
    ├── config/
    ├── credentials/
    ├── cron/
    ├── sessions/
    ├── agents/{claw,forge,...,sentinel}/
    ├── plugins/pinchtab/              # PinchTab OpenClaw plugin
    ├── skills/
    │   ├── pm-skills -> ~/Desktop/pm-skills  # Symlink
    │   ├── geo/                       # GEO orchestrator
    │   ├── geo-audit/                 # GEO sub-skills
    │   └── ...
    └── workspace/
```

---

## Port Map

| Port | Service | Type |
|------|---------|------|
| 3000 | Agent Orchestrator | Native (web dashboard) |
| 3100 | Paperclip | Docker (governance UI + API) |
| 5432 | postgres-superpower | Docker (existing) |
| 5433 | paperclip-db | Docker (Paperclip Postgres) |
| 9867 | PinchTab | Docker (browser automation) |
| 18789 | OpenClaw Gateway | Native (agent runtime) |

---

## Deployment Options

### Option A: Local Development (Current)

```bash
# Install OpenClaw
npm install -g openclaw@latest

# Set up gateway
cd ~/Desktop/openclaw-extracted/openclaw-main
pnpm install
pnpm build

# Start gateway locally
openclaw gateway run --bind loopback --port 18789

# Register cron jobs (from 04_ORCHESTRATION_WORKFLOWS.md)
openclaw cron add --name "claw-morning-briefing" --cron "0 7 * * *" ...
openclaw cron add --name "scout-lead-hunt" --cron "*/30 * * * *" ...
# ... (all 16 cron jobs)

# Verify
openclaw cron list
openclaw channels status --probe
```

### Option B: Docker Deployment

```yaml
# docker-compose.override.yml (add to existing)
services:
  openclaw-gateway:
    image: openclaw:local
    environment:
      HOME: /home/node
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      # Agent API keys
      NOTION_API_KEY: ${NOTION_API_KEY}
      HUNTER_API_KEY: ${HUNTER_API_KEY}
      APIFY_TOKEN: ${APIFY_TOKEN}
      BRAVE_API_KEY: ${BRAVE_API_KEY}
      INSTANTLY_API_KEY: ${INSTANTLY_API_KEY}
    volumes:
      - ~/.openclaw:/home/node/.openclaw
      - ./Clawdbot/skills:/home/node/.openclaw/skills
    ports:
      - "18789:18789"
    restart: unless-stopped
```

### Option C: Render.com (Production)

Uses the existing `render.yaml` from OpenClaw:

```yaml
services:
  - type: web
    name: optaimum-openclaw
    runtime: docker
    plan: starter
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: "8080"
      - key: OPENCLAW_GATEWAY_TOKEN
        generateValue: true
      - key: NOTION_API_KEY
        sync: false
      - key: HUNTER_API_KEY
        sync: false
      - key: APIFY_TOKEN
        sync: false
      - key: BRAVE_API_KEY
        sync: false
      - key: INSTANTLY_API_KEY
        sync: false
    disk:
      name: openclaw-data
      mountPath: /data
      sizeGB: 1
```

---

## Environment Variables (.env)

```bash
# === OpenClaw Gateway ===
OPENCLAW_GATEWAY_TOKEN=<generate>
OPENCLAW_STATE_DIR=~/.openclaw
OPENCLAW_WORKSPACE_DIR=~/.openclaw/workspace

# === Notion CRM ===
NOTION_API_KEY=<your_notion_api_key>

# === Lead Enrichment ===
HUNTER_API_KEY=<your_hunter_key>
APIFY_TOKEN=<your_apify_token>

# === Search & Research ===
BRAVE_API_KEY=<your_brave_api_key>

# === Email Outreach ===
INSTANTLY_API_KEY=<your_instantly_api_key>
INSTANTLY_CAMPAIGN_ID=<your_campaign_id>

# === Database ===
PGHOST=<your_neon_host>
PGDATABASE=<your_database>
PGUSER=<your_db_user>
PGPASSWORD=<your_db_password>
PGSSLMODE=require

# === Messaging Channels ===
TELEGRAM_BOT_TOKEN=<your_telegram_bot_token>

# === Optional ===
TWITTER_API_KEY=<if_configured>
SHOPIFY_STORE_URL=<if_configured>
SHOPIFY_ACCESS_TOKEN=<if_configured>
MATON_API_KEY=<for_gmail>
```

---

## Bootstrap Script

```bash
#!/bin/bash
# bootstrap-optaimum.sh — One-command setup

set -e

echo "=== OptAImum OpenClaw Company Setup ==="

# 1. Install OpenClaw
npm install -g openclaw@latest

# 2. Configure gateway
openclaw config set gateway.mode local
openclaw config set gateway.port 18789

# 3. Load environment
source .env

# 4. Install skills
for skill in lead-generation sales seo seo-competitor-analysis content-ideas \
  agent-content-pipeline linkedin twitter instagram-marketing gmail \
  gmail-inbox-zero-triage clawpify shopify-admin-api calendar; do
  openclaw skill install "$skill" 2>/dev/null || echo "Skill $skill: manual install needed"
done

# 5. Register all cron jobs
openclaw cron add --name "claw-morning-briefing" --cron "0 7 * * *" \
  --session main --wake now \
  --system-event "CLAW: Morning briefing. Read Revenue, Tasks, Leads. Top 3 priorities. Send to Telegram."

openclaw cron add --name "forge-system-check" --cron "0 8 * * *" \
  --session isolated --wake now \
  --system-event "FORGE: System health check. Verify gateway, cron, integrations. Report to CLAW."

openclaw cron add --name "scout-lead-hunt" --cron "*/30 * * * *" \
  --session isolated --wake now \
  --system-event "SCOUT: Hunt for new leads. Scrape, enrich, score. Hand to NEXUS."

openclaw cron add --name "sender-campaigns" --cron "0 9,17 * * 1-5" \
  --session isolated --wake now \
  --system-event "SENDER: Draft personalized cold emails for new leads. Add to Outreach Queue. Notify Telegram."

openclaw cron add --name "cultivator-followups" --cron "0 10 * * 1-5" \
  --session isolated --wake now \
  --system-event "CULTIVATOR: Check for leads needing 3/7/14 day follow-ups. Draft emails. Add to Outreach Queue."

openclaw cron add --name "nexus-data-sync" --cron "0 * * * *" \
  --session isolated \
  --system-event "NEXUS: Sync Notion CRM to PostgreSQL. Deduplicate. Update scores."

openclaw cron add --name "ranker-keyword-research" --cron "0 10 * * 3" \
  --session isolated --wake now \
  --system-event "RANKER: Weekly keyword research. Identify targets. Write briefs to Content Calendar."

openclaw cron add --name "scribe-content-creation" --cron "0 8 * * 1,4" \
  --session isolated --wake now \
  --system-event "SCRIBE: Write SEO content from RANKER briefs. Follow VOICE.md. Draft to Content Calendar."

openclaw cron add --name "herald-social-posts" --cron "0 8 * * 2,4" \
  --session isolated --wake now \
  --system-event "HERALD: Create social posts for LinkedIn, Twitter, Instagram. Draft to Social Content."

openclaw cron add --name "oracle-competitive-scan" --cron "0 14 * * 1,4" \
  --session isolated --wake now \
  --system-event "ORACLE: Competitive intelligence scan. Monitor competitors. Flag high-impact findings."

openclaw cron add --name "compass-roadmap-review" --cron "0 9 * * 1" \
  --session isolated --wake now \
  --system-event "COMPASS: Weekly roadmap review. Update priorities. Draft PRD if needed."

openclaw cron add --name "sentinel-health-monitor" --cron "0 */6 * * *" \
  --session isolated \
  --system-event "SENTINEL: Check all systems. Alert on errors via Telegram."

openclaw cron add --name "amplify-experiment-review" --cron "0 16 * * 5" \
  --session isolated --wake now \
  --system-event "AMPLIFY: Friday experiment review. Check results. Roll out winners."

openclaw cron add --name "nexus-weekly-report" --cron "0 17 * * 5" \
  --session isolated --wake now \
  --system-event "NEXUS: Generate weekly revenue and pipeline report. Write to Weekly Reports."

openclaw cron add --name "nexus-monthly-analysis" --cron "0 9 1 * *" \
  --session isolated --wake now \
  --system-event "NEXUS: Monthly growth analysis. Full metrics review. Write to Monthly Reports."

# 6. Start gateway
echo "Starting OpenClaw gateway..."
openclaw gateway run --bind loopback --port 18789 --force &

# 7. Verify
sleep 5
openclaw cron list
openclaw channels status --probe

echo "=== OptAImum OpenClaw Company: ONLINE ==="
echo "15 agents configured. 15 cron jobs registered."
echo "Gateway running on port 18789."
```
