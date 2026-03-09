# OUTPUT 4 — ORCHESTRATION WORKFLOWS

## How Agents Coordinate

OpenClaw provides two native orchestration primitives:
1. **Cron jobs** — time-based triggers (`openclaw cron add`)
2. **Heartbeats** — event-driven agent wakeups

All agent orchestration uses these two mechanisms. No external orchestrator needed.

---

## Workflow 1: SEO Campaign Launch

```
Trigger: RANKER heartbeat (Wednesday 10AM)

Step 1: RANKER — Keyword Research
  ├── Search Brave for target keywords
  ├── Analyze competitor SERP positions
  ├── Score keywords by volume/difficulty/intent
  └── Output: Write keyword briefs to Notion Content Calendar
      Status: "Research"

Step 2: SCRIBE — Content Creation (Thursday 8AM heartbeat)
  ├── Read briefs from Notion Content Calendar where Status = "Research"
  ├── Write SEO-optimized blog post draft
  ├── Apply VOICE.md guidelines
  └── Output: Update Notion entry, Status -> "Review"
      Notify human via Telegram for approval

Step 3: HUMAN — Approval Gate
  ├── Review draft in Notion
  ├── Edit if needed
  └── Set Status -> "Approved"

Step 4: HERALD — Social Distribution (next Tue/Thu heartbeat)
  ├── Read approved content from Notion
  ├── Create social posts promoting the article
  ├── Draft LinkedIn, Twitter, Instagram variants
  └── Output: Write to Notion Social Content, Status -> "Draft"
      Notify human for approval

Step 5: NEXUS — Analytics Tracking
  ├── Log campaign launch to PostgreSQL
  ├── Set up tracking metrics
  └── ORACLE monitors ranking progress in next research cycle
```

### OpenClaw Cron Registration

```bash
# RANKER weekly keyword research
openclaw cron add \
  --name "ranker-keyword-research" \
  --cron "0 10 * * 3" \
  --session isolated \
  --system-event "RANKER: Run weekly keyword research cycle. Search for target keywords, analyze competitors, score and write briefs to Notion Content Calendar." \
  --wake now

# SCRIBE content creation
openclaw cron add \
  --name "scribe-content-creation" \
  --cron "0 8 * * 1,4" \
  --session isolated \
  --system-event "SCRIBE: Check Notion Content Calendar for briefs with Status=Research. Write SEO-optimized drafts. Follow VOICE.md. Update status to Review." \
  --wake now

# HERALD social distribution
openclaw cron add \
  --name "herald-social-posts" \
  --cron "0 8 * * 2,4" \
  --session isolated \
  --system-event "HERALD: Check Notion Content Calendar for approved content. Create LinkedIn, Twitter, Instagram post variants. Write to Social Content database." \
  --wake now
```

---

## Workflow 2: Market Research Pipeline

```
Trigger: ORACLE heartbeat (Monday/Thursday 2PM)

Step 1: ORACLE — Competitive Scan
  ├── Search Brave for competitor news, pricing changes, feature launches
  ├── Search for industry trend keywords
  ├── Check social media for sentiment signals
  └── Output: Write findings to internal research log

Step 2: ORACLE — Opportunity Analysis
  ├── Cross-reference findings with current ICP
  ├── Score opportunities by impact/effort
  ├── Identify new market segments
  └── Output: Write to Notion (Competitive Analysis fields on leads)
      Flag high-impact items for CLAW

Step 3: CLAW — Strategic Review (next morning briefing)
  ├── Read ORACLE's flagged items
  ├── Decide: act now, defer, or ignore
  ├── If act: create tasks in Notion for relevant agents
  └── Output: Morning briefing includes strategic updates

Step 4: AMPLIFY — Tactical Execution
  ├── Translate strategy decisions into agent tasks
  ├── Assign keyword targets to RANKER
  ├── Assign outreach angles to SENDER
  └── Assign content topics to SCRIBE
```

### OpenClaw Cron Registration

```bash
# ORACLE competitive research
openclaw cron add \
  --name "oracle-competitive-scan" \
  --cron "0 14 * * 1,4" \
  --session isolated \
  --system-event "ORACLE: Run competitive intelligence scan. Search for competitor pricing changes, feature launches, industry trends. Score opportunities. Write findings to Notion. Flag high-impact items for CLAW." \
  --wake now
```

---

## Workflow 3: Growth Experiment Cycle

```
Trigger: AMPLIFY heartbeat (Daily 8AM) — experiment check

Step 1: AMPLIFY — Hypothesis Generation (Weekly Monday)
  ├── Review last week's metrics from NEXUS
  ├── Identify underperforming channels/campaigns
  ├── Generate 3 experiment hypotheses
  └── Output: Write experiments to Notion Tasks
      Request human approval via Telegram

Step 2: HUMAN — Experiment Approval
  ├── Review hypotheses in Notion
  ├── Approve/reject/modify
  └── Mark approved experiments

Step 3: Agent Execution (varies by experiment type)
  ├── Email experiment → SENDER adjusts campaign parameters
  ├── SEO experiment → RANKER tests new keyword strategy
  ├── Content experiment → SCRIBE writes variant content
  ├── Outreach experiment → SCOUT tests new ICP segment
  └── Each agent logs baseline + results to PostgreSQL

Step 4: NEXUS — Data Collection (continuous)
  ├── Track experiment metrics
  ├── Compare against baseline
  └── Flag when statistical significance reached

Step 5: AMPLIFY — Experiment Review (Friday)
  ├── Read experiment results from NEXUS
  ├── Determine winner/loser
  ├── Roll out winners, kill losers
  └── Output: Experiment report in weekly summary to CLAW
```

### OpenClaw Cron Registration

```bash
# AMPLIFY experiment review cycle
openclaw cron add \
  --name "amplify-experiment-review" \
  --cron "0 16 * * 5" \
  --session isolated \
  --system-event "AMPLIFY: Review all active experiments. Check metrics from NEXUS. Determine winners and losers. Include experiment results in weekly report for CLAW." \
  --wake now
```

---

## Workflow 4: Full Lead Pipeline (End-to-End)

```
Trigger: SCOUT heartbeat (every 30 minutes)

  SCOUT: Find leads
    ├── Scrape via Apify (Google Maps, LinkedIn)
    ├── Enrich via Hunter.io (find emails)
    ├── Score against ICP criteria
    └── Hand to NEXUS

  NEXUS: Store leads
    ├── Add to Notion Leads CRM
    ├── Deduplicate against existing
    ├── Assign initial score
    └── Sync to PostgreSQL

  SENDER: First touch (9AM weekday heartbeat)
    ├── Query Notion for new leads, Status = "New"
    ├── Draft personalized cold email
    ├── Add to Notion Outreach Queue, Status = "Draft"
    └── Notify human via Telegram

  HUMAN: Approve outreach
    ├── Review in Notion
    └── Set Status = "Approved"

  SENDER: Send via Instantly.ai
    ├── Add approved leads to Instantly campaign
    ├── Track delivery/opens/replies
    └── Update Notion with results

  CULTIVATOR: Follow-up (if no reply)
    ├── Day 3: Value-add follow-up
    ├── Day 7: Case study email
    ├── Day 14: Breakup email
    └── All through Notion approval queue

  CONNECTOR: Warm handoff (if reply received)
    ├── Craft personalized response
    ├── Move lead to "Qualified" in Notion
    └── Notify human for discovery call scheduling
```

---

## Workflow 5: Morning Briefing

```
Trigger: CLAW heartbeat (Daily 7AM)

Step 1: Gather data
  ├── Read Notion Revenue database (last 24h)
  ├── Read Notion Tasks (due today)
  ├── Read Notion Leads CRM (new leads count)
  ├── Read campaign metrics from SENDER's last report
  └── Check calendar for meetings

Step 2: Synthesize
  ├── Format morning briefing
  ├── Top 3 priorities for today
  ├── Revenue update
  ├── Pipeline status
  └── Urgent items needing attention

Step 3: Deliver
  └── Send via Telegram to Jack

Format:
  ⚡ MORNING BRIEFING — [Date]

  REVENUE: $X (+Y% vs yesterday)
  PIPELINE: X new leads, Y qualified, Z proposals

  TOP 3 TODAY:
  1. [Priority 1]
  2. [Priority 2]
  3. [Priority 3]

  NEEDS YOUR ATTENTION:
  - [Item requiring human decision]
```

### OpenClaw Cron Registration

```bash
# CLAW morning briefing
openclaw cron add \
  --name "claw-morning-briefing" \
  --cron "0 7 * * *" \
  --session main \
  --system-event "CLAW: Generate morning briefing. Read Revenue, Tasks, Leads CRM, campaign metrics. Synthesize top 3 priorities. Send to Telegram." \
  --wake now
```

---

## Master Cron Schedule (All Agents)

```bash
# === EXECUTIVE ===
# CLAW: Morning briefing
0 7 * * *           claw-morning-briefing

# === OPERATIONS ===
# FORGE: System health check
0 8 * * *           forge-system-check

# SENTINEL: Operations monitor
0 */6 * * *         sentinel-health-monitor

# NEXUS: Data sync
0 * * * *           nexus-data-sync

# === SALES ===
# SCOUT: Lead hunting
*/30 * * * *        scout-lead-hunt

# SENDER: Campaign management
0 9,17 * * 1-5      sender-campaigns

# CULTIVATOR: Follow-ups
0 10 * * 1-5        cultivator-followups

# === MARKETING ===
# RANKER: SEO research
0 10 * * 3          ranker-keyword-research

# SCRIBE: Content creation
0 8 * * 1,4         scribe-content-creation

# HERALD: Social media
0 8 * * 2,4         herald-social-posts

# === STRATEGY ===
# ORACLE: Competitive intel
0 14 * * 1,4        oracle-competitive-scan

# COMPASS: Product roadmap
0 9 * * 1           compass-roadmap-review

# AMPLIFY: Experiment review
0 16 * * 5          amplify-experiment-review

# === REPORTING ===
# NEXUS: Weekly revenue report
0 17 * * 5          nexus-weekly-report

# NEXUS: Monthly analysis
0 9 1 * *           nexus-monthly-analysis
```
