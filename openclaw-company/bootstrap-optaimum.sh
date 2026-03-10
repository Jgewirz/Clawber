#!/bin/bash
# bootstrap-optaimum.sh — OptAImum OpenClaw Company Cron Registration
# Run AFTER gateway is running: bash bootstrap-optaimum.sh
#
# CRITICAL FIX: --session isolated requires --message (not --system-event)
# Only --session main can use --system-event
# Each isolated job gets --agent {id} to route to the correct agent

set -e

echo "============================================"
echo "  OptAImum OpenClaw — Cron Registration"
echo "  13 Agents | 15 Cron Jobs"
echo "============================================"
echo ""

# Verify gateway is running
if ! openclaw gateway status &>/dev/null; then
    echo "ERROR: Gateway not running. Start it first:"
    echo "  openclaw gateway run --bind loopback --port 18789 --force &"
    exit 1
fi

echo "[1/5] Registering EXECUTIVE cron jobs..."

# === CLAW — CEO Morning Briefing (MAIN session — uses --system-event) ===
openclaw cron add \
  --name "claw-morning-briefing" \
  --cron "0 7 * * *" \
  --tz "America/New_York" \
  --session main \
  --system-event "CLAW CEO: Morning briefing. Read Notion Revenue, Tasks, Leads CRM. Synthesize top 3 priorities. Pipeline status. Send to Telegram. Voice: confident, direct, numbers-driven." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  claw-morning-briefing: already exists"

# === FORGE — CTO System Check (ISOLATED — uses --message + --agent) ===
openclaw cron add \
  --name "forge-system-check" \
  --cron "0 8 * * *" \
  --tz "America/New_York" \
  --session isolated \
  --agent forge \
  --message "Daily system health check. Verify gateway running, all cron jobs executed in last 24h, integrations connected. Report status to CLAW." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  forge-system-check: already exists"

echo "[2/5] Registering SALES cron jobs..."

# === SCOUT — Lead Hunt (ISOLATED — reduced from every-30-min to 4x/day weekdays) ===
openclaw cron add \
  --name "scout-lead-hunt" \
  --cron "0 8,11,14,17 * * 1-5" \
  --tz "America/New_York" \
  --session isolated \
  --agent scout \
  --message "Hunt for new leads. ICP: SMBs 10-200 employees, SaaS/agencies. Use Brave Search for signals (hiring SDRs, competitor complaints, funded startups). Enrich contacts. Score 1-100. Hand qualified leads (60+) to NEXUS for CRM entry." \
  --wake now \
  --no-deliver \
  2>/dev/null || echo "  scout-lead-hunt: already exists"

# === SENDER — Cold Outreach Campaigns (ISOLATED) ===
openclaw cron add \
  --name "sender-campaigns" \
  --cron "0 9,17 * * 1-5" \
  --tz "America/New_York" \
  --session isolated \
  --agent sender \
  --message "Check Notion Leads CRM for new leads (Score>60, Status=New). Draft personalized cold emails following VOICE.md. Add to Notion Outreach Queue as Draft. Notify Telegram for approval." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  sender-campaigns: already exists"

# === CULTIVATOR — Follow-ups (ISOLATED) ===
openclaw cron add \
  --name "cultivator-followups" \
  --cron "0 10 * * 1-5" \
  --tz "America/New_York" \
  --session isolated \
  --agent cultivator \
  --message "Check Notion Leads CRM for leads needing follow-up. Day 3: value-add. Day 7: case study. Day 14: breakup email. Draft to Outreach Queue for approval." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  cultivator-followups: already exists"

echo "[3/5] Registering DATA cron jobs..."

# === NEXUS — Hourly Data Sync (ISOLATED — internal, no delivery) ===
openclaw cron add \
  --name "nexus-data-sync" \
  --cron "0 8,10,12,15,18 * * 1-5" \
  --tz "America/New_York" \
  --session isolated \
  --agent nexus \
  --message "Sync Notion CRM data to PostgreSQL. Process new leads from SCOUT. Deduplicate leads. Update lead scores. Maintain data hygiene." \
  --no-deliver \
  2>/dev/null || echo "  nexus-data-sync: already exists"

# === NEXUS — Weekly Report (ISOLATED — internal) ===
openclaw cron add \
  --name "nexus-weekly-report" \
  --cron "0 17 * * 5" \
  --tz "America/New_York" \
  --session isolated \
  --agent nexus \
  --message "Generate weekly revenue and pipeline report. Aggregate leads, outreach, conversions, revenue. Write to Notion Weekly Reports." \
  --no-deliver \
  2>/dev/null || echo "  nexus-weekly-report: already exists"

# === NEXUS — Monthly Analysis (ISOLATED — internal) ===
openclaw cron add \
  --name "nexus-monthly-analysis" \
  --cron "0 9 1 * *" \
  --tz "America/New_York" \
  --session isolated \
  --agent nexus \
  --message "Monthly growth analysis. Full metrics review: revenue trend, pipeline velocity, conversion rates, CAC, LTV. Write to Notion Monthly Reports." \
  --no-deliver \
  2>/dev/null || echo "  nexus-monthly-analysis: already exists"

echo "[4/5] Registering MARKETING cron jobs..."

# === RANKER — Weekly SEO (ISOLATED — internal) ===
openclaw cron add \
  --name "ranker-keyword-research" \
  --cron "0 10 * * 3" \
  --tz "America/New_York" \
  --session isolated \
  --agent ranker \
  --message "Weekly keyword research. Search Brave for AI sales automation keywords. Analyze SERP competition. Score by volume/difficulty/intent. Write content briefs to Notion Content Calendar." \
  --wake now \
  --no-deliver \
  2>/dev/null || echo "  ranker-keyword-research: already exists"

# === SCRIBE — Content Creation (ISOLATED) ===
openclaw cron add \
  --name "scribe-content-creation" \
  --cron "0 8 * * 1,4" \
  --tz "America/New_York" \
  --session isolated \
  --agent scribe \
  --message "Check Notion Content Calendar for briefs (Status=Research). Write SEO-optimized article draft. Follow VOICE.md: confident, direct, no jargon. Update status to Review. Notify Telegram." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  scribe-content-creation: already exists"

# === HERALD — Social Posts (ISOLATED) ===
openclaw cron add \
  --name "herald-social-posts" \
  --cron "0 8 * * 2,4" \
  --tz "America/New_York" \
  --session isolated \
  --agent herald \
  --message "Create social media posts. LinkedIn: thought leadership. Twitter: quick tips. Instagram: visual content. All drafts to Notion Social Content. Follow VOICE.md. Notify Telegram for approval." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  herald-social-posts: already exists"

# === AMPLIFY — Friday Experiment Review (ISOLATED) ===
openclaw cron add \
  --name "amplify-experiment-review" \
  --cron "0 16 * * 5" \
  --tz "America/New_York" \
  --session isolated \
  --agent amplify \
  --message "AMPLIFY CMO: Friday experiment review. Check all active growth experiments. Determine winners/losers. Roll out winners. Include in weekly report for CLAW." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  amplify-experiment-review: already exists"

echo "[5/5] Registering STRATEGY & OPS cron jobs..."

# === ORACLE — Competitive Intel (ISOLATED — internal) ===
openclaw cron add \
  --name "oracle-competitive-scan" \
  --cron "0 14 * * 1,4" \
  --tz "America/New_York" \
  --session isolated \
  --agent oracle \
  --message "Competitive intelligence scan. Search for competitor pricing changes, feature launches, industry trends. Score opportunities. Write to Notion. Flag high-impact findings for CLAW." \
  --wake now \
  --no-deliver \
  2>/dev/null || echo "  oracle-competitive-scan: already exists"

# === COMPASS — Weekly Roadmap (ISOLATED) ===
openclaw cron add \
  --name "compass-roadmap-review" \
  --cron "0 9 * * 1" \
  --tz "America/New_York" \
  --session isolated \
  --agent compass \
  --message "Weekly product roadmap review. Check Notion Tasks for feature priorities. RICE score pending items. Draft PRD if new feature approved. Report to FORGE." \
  --wake now \
  --announce --channel telegram \
  2>/dev/null || echo "  compass-roadmap-review: already exists"

# === SENTINEL — System Health (ISOLATED — internal, alerts only on errors) ===
openclaw cron add \
  --name "sentinel-health-monitor" \
  --cron "0 0,6,12,18 * * *" \
  --tz "America/New_York" \
  --session isolated \
  --agent sentinel \
  --message "System health check. Verify gateway, cron execution, integration connections, error logs. Only alert via Telegram if something is broken. Log results to PostgreSQL." \
  --no-deliver \
  2>/dev/null || echo "  sentinel-health-monitor: already exists"

echo ""
echo "============================================"
echo "  CRON REGISTRATION COMPLETE"
echo ""
echo "  Total jobs: 15"
echo "  Main session: 1 (CLAW morning briefing)"
echo "  Isolated sessions: 14 (all use --message + --agent)"
echo "  Human-facing (Telegram): 8 jobs"
echo "  Internal-only (no-deliver): 7 jobs"
echo ""
echo "  Verify: openclaw cron list"
echo "  Test:   openclaw cron run <job-name>"
echo "============================================"
