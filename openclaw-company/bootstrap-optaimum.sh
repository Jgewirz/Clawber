#!/bin/bash
# bootstrap-optaimum.sh — One-command OptAImum OpenClaw Company Setup
# Run: bash bootstrap-optaimum.sh

set -e

echo "============================================"
echo "  OptAImum OpenClaw Company — Bootstrap"
echo "  13 Agents | 15 Cron Jobs | Full Stack"
echo "============================================"
echo ""

# Check OpenClaw is installed
if ! command -v openclaw &> /dev/null; then
    echo "Installing OpenClaw..."
    npm install -g openclaw@latest
fi

echo "[1/4] Configuring gateway..."
openclaw config set gateway.mode local
openclaw config set gateway.port 18789

echo "[2/4] Registering cron jobs..."

# === EXECUTIVE ===
openclaw cron add \
  --name "claw-morning-briefing" \
  --cron "0 7 * * *" \
  --session main \
  --system-event "CLAW CEO: Morning briefing. Read Notion Revenue, Tasks, Leads CRM. Synthesize top 3 priorities. Pipeline status. Send to Telegram. Voice: confident, direct, numbers-driven." \
  --wake now 2>/dev/null || echo "  claw-morning-briefing: already exists"

openclaw cron add \
  --name "forge-system-check" \
  --cron "0 8 * * *" \
  --session isolated \
  --system-event "FORGE CTO: Daily system health check. Verify gateway running, all cron jobs executed in last 24h, integrations connected. Report status to CLAW." \
  --wake now 2>/dev/null || echo "  forge-system-check: already exists"

# === SALES ===
openclaw cron add \
  --name "scout-lead-hunt" \
  --cron "*/30 * * * *" \
  --session isolated \
  --system-event "SCOUT: Hunt for new leads. ICP: SMBs 10-200 employees, SaaS/agencies. Use Brave Search for signals. Enrich with Hunter.io. Score 1-100. Add qualified leads to Notion Leads CRM." \
  --wake now 2>/dev/null || echo "  scout-lead-hunt: already exists"

openclaw cron add \
  --name "sender-campaigns" \
  --cron "0 9,17 * * 1-5" \
  --session isolated \
  --system-event "SENDER: Check Notion Leads CRM for new leads (Score>60, Status=New). Draft personalized cold emails following VOICE.md. Add to Notion Outreach Queue as Draft. Notify Telegram for approval." \
  --wake now 2>/dev/null || echo "  sender-campaigns: already exists"

openclaw cron add \
  --name "cultivator-followups" \
  --cron "0 10 * * 1-5" \
  --session isolated \
  --system-event "CULTIVATOR: Check Notion Leads CRM for leads needing follow-up. Day 3: value-add. Day 7: case study. Day 14: breakup email. Draft to Outreach Queue for approval." \
  --wake now 2>/dev/null || echo "  cultivator-followups: already exists"

# === DATA ===
openclaw cron add \
  --name "nexus-data-sync" \
  --cron "0 * * * *" \
  --session isolated \
  --system-event "NEXUS: Sync Notion CRM data to PostgreSQL. Deduplicate leads. Update lead scores. Maintain data hygiene." \
  2>/dev/null || echo "  nexus-data-sync: already exists"

# === MARKETING ===
openclaw cron add \
  --name "ranker-keyword-research" \
  --cron "0 10 * * 3" \
  --session isolated \
  --system-event "RANKER: Weekly keyword research. Search Brave for AI sales automation keywords. Analyze SERP competition. Score by volume/difficulty/intent. Write briefs to Notion Content Calendar." \
  --wake now 2>/dev/null || echo "  ranker-keyword-research: already exists"

openclaw cron add \
  --name "scribe-content-creation" \
  --cron "0 8 * * 1,4" \
  --session isolated \
  --system-event "SCRIBE: Check Notion Content Calendar for briefs (Status=Research). Write SEO-optimized article draft. Follow VOICE.md: confident, direct, no jargon. Update status to Review. Notify Telegram." \
  --wake now 2>/dev/null || echo "  scribe-content-creation: already exists"

openclaw cron add \
  --name "herald-social-posts" \
  --cron "0 8 * * 2,4" \
  --session isolated \
  --system-event "HERALD: Create social media posts. LinkedIn: thought leadership. Twitter: quick tips. Instagram: visual content. All drafts to Notion Social Content. Follow VOICE.md. Notify Telegram for approval." \
  --wake now 2>/dev/null || echo "  herald-social-posts: already exists"

# === STRATEGY ===
openclaw cron add \
  --name "oracle-competitive-scan" \
  --cron "0 14 * * 1,4" \
  --session isolated \
  --system-event "ORACLE: Competitive intelligence scan. Search for competitor pricing changes, feature launches, industry trends. Score opportunities. Write to Notion. Flag high-impact findings for CLAW." \
  --wake now 2>/dev/null || echo "  oracle-competitive-scan: already exists"

openclaw cron add \
  --name "compass-roadmap-review" \
  --cron "0 9 * * 1" \
  --session isolated \
  --system-event "COMPASS: Weekly product roadmap review. Check Notion Tasks for feature priorities. RICE score pending items. Draft PRD if new feature approved. Report to FORGE." \
  --wake now 2>/dev/null || echo "  compass-roadmap-review: already exists"

# === OPERATIONS ===
openclaw cron add \
  --name "sentinel-health-monitor" \
  --cron "0 */6 * * *" \
  --session isolated \
  --system-event "SENTINEL: System health check. Verify gateway, cron execution, integration connections, error logs. Only alert via Telegram if something is broken." \
  2>/dev/null || echo "  sentinel-health-monitor: already exists"

# === REPORTING ===
openclaw cron add \
  --name "amplify-experiment-review" \
  --cron "0 16 * * 5" \
  --session isolated \
  --system-event "AMPLIFY CMO: Friday experiment review. Check all active growth experiments. Determine winners/losers. Roll out winners. Include in weekly report for CLAW." \
  --wake now 2>/dev/null || echo "  amplify-experiment-review: already exists"

openclaw cron add \
  --name "nexus-weekly-report" \
  --cron "0 17 * * 5" \
  --session isolated \
  --system-event "NEXUS: Generate weekly revenue and pipeline report. Aggregate leads, outreach, conversions, revenue. Write to Notion Weekly Reports." \
  --wake now 2>/dev/null || echo "  nexus-weekly-report: already exists"

openclaw cron add \
  --name "nexus-monthly-analysis" \
  --cron "0 9 1 * *" \
  --session isolated \
  --system-event "NEXUS: Monthly growth analysis. Full metrics review: revenue trend, pipeline velocity, conversion rates, CAC, LTV. Write to Notion Monthly Reports." \
  --wake now 2>/dev/null || echo "  nexus-monthly-analysis: already exists"

echo "[3/4] Verifying skills..."
SKILL_DIR="$HOME/Desktop/Clawdbot/skills"
SKILL_COUNT=$(ls -d "$SKILL_DIR"/*/ 2>/dev/null | wc -l)
echo "  Found $SKILL_COUNT installed skills in $SKILL_DIR"

echo "[4/4] Starting gateway..."
echo "  Run: openclaw gateway run --bind loopback --port 18789 --force"
echo ""
echo "============================================"
echo "  SETUP COMPLETE"
echo ""
echo "  Agents:    13 configured"
echo "  Cron Jobs: 15 registered"
echo "  Skills:    $SKILL_COUNT installed"
echo ""
echo "  Verify:    openclaw cron list"
echo "  Monitor:   openclaw cron runs"
echo "  Logs:      openclaw logs --filter cron"
echo "============================================"
