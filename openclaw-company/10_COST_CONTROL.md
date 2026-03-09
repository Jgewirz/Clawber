# OUTPUT 10 — COST CONTROL

## Token Optimization, Agent Budgeting, and Task Prioritization

---

## Token Budget Architecture

### Daily Token Allocation

```
TOTAL DAILY BUDGET: 500,000 tokens (~$7.50/day at Claude Sonnet rates)

Distribution:
  CLAW (CEO):         50,000 tokens (10%)  — Strategy + briefing
  FORGE (CTO):        30,000 tokens (6%)   — System oversight
  AMPLIFY (CMO):      40,000 tokens (8%)   — Marketing coordination
  SCOUT:              20,000 tokens (4%)   — Lead research
  SENDER:             15,000 tokens (3%)   — Email drafting
  NEXUS:              25,000 tokens (5%)   — Data management
  CULTIVATOR:         15,000 tokens (3%)   — Follow-ups
  CONNECTOR:          10,000 tokens (2%)   — Warm outreach
  RANKER:             20,000 tokens (4%)   — SEO research
  SCRIBE:             30,000 tokens (6%)   — Content writing
  HERALD:             15,000 tokens (3%)   — Social posts
  ORACLE:             25,000 tokens (5%)   — Research
  COMPASS:            20,000 tokens (4%)   — Product management
  SENTINEL:           10,000 tokens (2%)   — Monitoring
  ─────────────────────────────────────────
  ALLOCATED:         325,000 tokens (65%)
  RESERVE:           175,000 tokens (35%)  — Burst capacity, ad-hoc requests
```

---

## Token Optimization Strategies

### 1. Skill-Based Context Loading

Instead of loading full agent prompts every time, use OpenClaw's skill system to load only relevant context:

```
BAD:  Load all 14 skills into every agent session (~50K tokens/session)
GOOD: Load only assigned skills per agent (~5-15K tokens/session)

SCOUT loads: lead-generation, seo-competitor-analysis (2 skills)
SENDER loads: sales, gmail (2 skills)
SCRIBE loads: content-ideas, agent-content-pipeline, seo (3 skills)
```

**Savings: ~60% reduction in per-session context tokens**

### 2. Isolated Sessions (Not Main)

Run most agents in `isolated` sessions. This prevents context accumulation:

```
Main session:   Context grows with every interaction (expensive)
Isolated:       Fresh context per job run (predictable cost)

Only CLAW uses main session (for continuity).
All others use isolated sessions.
```

**Savings: ~40% reduction in context tokens for recurring jobs**

### 3. Short System Prompts

Agent system prompts should be under 500 tokens. Details go in skills, not prompts.

```
BAD (1200 tokens):
  "You are SCOUT, a lead intelligence agent. Your job is to find leads
   using the following criteria: company size 10-200, SaaS or agency,
   decision makers with titles VP Sales, CEO, CTO, COO. You should use
   Hunter.io for email enrichment with the following API key... You should
   check these specific databases... Your scoring model weights are..."

GOOD (200 tokens):
  "You are SCOUT. Find and enrich leads matching our ICP.
   Use the lead-generation skill for methodology.
   Score leads 1-100. Hand enriched leads to NEXUS via Notion.
   Budget: 5 Hunter credits, 10 Apify runs per session."
```

**Savings: ~70% reduction in system prompt tokens**

### 4. Result Summarization

When agents pass information between each other, summarize:

```
BAD:  SCOUT dumps 50 raw lead records to NEXUS (huge token payload)
GOOD: SCOUT writes leads to Notion, passes only count + IDs to NEXUS

BAD:  ORACLE sends full competitive analysis text to CLAW
GOOD: ORACLE writes to Notion, sends 3-line summary to CLAW
```

**Savings: ~80% reduction in inter-agent communication tokens**

### 5. Brave Search Token Efficiency

```
Per search query: ~500 tokens input + ~2000 tokens output
Limit per agent per session:

SCOUT:   10 searches/session (max 25K tokens)
ORACLE:  20 searches/session (max 50K tokens)
RANKER:  15 searches/session (max 37K tokens)
SCRIBE:   5 searches/session (max 12K tokens)
```

---

## API Cost Budget

### Monthly API Costs (Phase 1)

| Service | Plan | Monthly Cost | Usage |
|---------|------|-------------|-------|
| Claude API (Sonnet) | Pay-per-token | ~$225 | 500K tokens/day |
| Neon PostgreSQL | Free | $0 | 0.5 GB storage |
| Notion | Free/Personal | $0 | 9 databases |
| Hunter.io | Free | $0 | 25 credits/month |
| Apify | Free | $0 | $5 platform credits |
| Brave Search | Free | $0 | 2000 queries/month |
| Instantly.ai | Growth | $30 | 1000 emails/month |
| Render.com | Starter | $7 | Gateway hosting |
| **TOTAL** | | **~$262/month** | |

### Cost Per Lead (Target)

```
Monthly budget: $262
Target leads/month: 200
Target qualified/month: 40
Target calls booked/month: 10

Cost per lead: $1.31
Cost per qualified lead: $6.55
Cost per booked call: $26.20

Break-even: 1 client at $262+/month
```

---

## Agent Budgeting Rules

### Hard Limits (Gateway-Enforced)

```yaml
budget_rules:
  # No agent can exceed its daily token allocation
  daily_token_hard_cap: true

  # Agents that hit their limit go dormant until midnight
  on_budget_exceeded: pause_until_reset

  # Reserve pool: only CLAW can allocate from reserve
  reserve_pool_access: [claw]

  # External API calls have per-agent limits
  hunter_credits:
    scout: 5/day
    total: 5/day  # Free plan constraint

  apify_runs:
    scout: 10/day
    oracle: 5/day
    total: 15/day

  brave_searches:
    scout: 30/day
    oracle: 50/day
    ranker: 30/day
    scribe: 10/day
    total: 120/day  # Well within 2000/month free tier

  instantly_emails:
    sender: 50/day
    cultivator: 20/day
    total: 70/day  # ~1500/month (within Growth plan)
```

### Soft Limits (Agent-Enforced via Prompts)

```yaml
agent_guidelines:
  # Agents should self-regulate before hitting hard limits
  token_warning_threshold: 80%  # Agent logs warning at 80% of daily budget

  # Agents should batch operations for efficiency
  batch_notion_writes: true  # Write 10 leads at once, not 1 at a time

  # Agents should cache frequently accessed data
  cache_duration: 1h  # Don't re-query Notion for same data within 1 hour
```

---

## Task Prioritization Framework

### Priority Levels

```
P0 — CRITICAL (do immediately):
  - Inbound lead response (speed-to-lead)
  - System outage alerts
  - Human-escalated tasks
  Token allocation: Unlimited (draw from reserve)

P1 — HIGH (do today):
  - Daily briefing (CLAW)
  - Campaign sends (SENDER)
  - Follow-up sequences (CULTIVATOR)
  Token allocation: Full daily budget

P2 — MEDIUM (do this week):
  - SEO research (RANKER)
  - Content creation (SCRIBE)
  - Social posts (HERALD)
  Token allocation: Standard daily budget

P3 — LOW (do when capacity available):
  - Competitive research (ORACLE)
  - Product roadmap (COMPASS)
  - Data cleanup (NEXUS)
  Token allocation: Reduced (50% of standard)
```

### Priority Escalation Rules

```
IF lead replies to cold email:
  ESCALATE to P0
  TRIGGER CONNECTOR immediately
  NOTIFY human via Telegram

IF campaign open rate drops below 10%:
  ESCALATE to P1
  TRIGGER AMPLIFY for review
  PAUSE SENDER until reviewed

IF SENTINEL detects system error:
  ESCALATE to P0
  TRIGGER FORGE immediately
  NOTIFY human via Telegram

IF daily token budget hits 90%:
  DOWNGRADE all P3 tasks to PAUSED
  PRESERVE remaining tokens for P0/P1
```

---

## Cost Reduction Tactics

### Immediate (Week 1)

1. **Use Haiku for simple tasks.** SENTINEL health checks, NEXUS data syncs, and HERALD social post drafts don't need Sonnet-level intelligence.
   - Savings: ~50% on those agents' token costs

2. **Cache Notion reads.** Don't query the same database multiple times per hour.
   - Savings: ~20% reduction in NEXUS tokens

3. **Batch operations.** SCOUT should find 10 leads per session, not 1.
   - Savings: ~60% reduction in SCOUT overhead tokens

### Medium-term (Month 1-2)

4. **Build custom Notion query templates.** Pre-format queries so agents don't need to construct them from scratch.
   - Savings: ~30% reduction in query construction tokens

5. **Store agent outputs in PostgreSQL, not just Notion.** PostgreSQL queries are cheaper than Notion API calls.
   - Savings: Reduced API calls, faster data access

### Long-term (Month 3+)

6. **Train specialized fine-tuned models.** For repetitive tasks (email personalization, lead scoring), a fine-tuned smaller model could replace Sonnet.
   - Savings: ~80% on those specific tasks

7. **Implement RAG over past agent outputs.** Agents learn from previous successful patterns instead of reasoning from scratch.
   - Savings: ~30% reduction in research tokens

---

## Monthly Cost Projections

| Phase | Agents | Tokens/Day | API Costs | Total/Month |
|-------|--------|-----------|-----------|-------------|
| Phase 1 | 13 | 500K | $225 | $262 |
| Phase 2 | 20 | 750K | $340 | $400 |
| Phase 3 | 30 | 1M | $450 | $530 |
| Phase 4 | 50 | 1.5M | $675 | $800 |
| Phase 5 | 100 | 2.5M | $1,125 | $1,300 |

**Target:** Revenue should be 10x monthly agent costs minimum.
- Phase 1: Need $2,620+/month revenue
- Phase 5: Need $13,000+/month revenue

---

## ROI Tracking

NEXUS tracks agent ROI monthly:

```
Agent ROI = (Revenue Attributed to Agent) / (Agent Monthly Cost)

Example:
  SCOUT: Found 200 leads -> 10 qualified -> 2 closed -> $6,000 revenue
  SCOUT monthly cost: ~$20 (tokens) + $0 (API free tier)
  SCOUT ROI: $6,000 / $20 = 300x

  SENDER: Sent 200 emails -> 20 replies -> 5 calls -> 2 closed -> $6,000
  SENDER monthly cost: ~$15 (tokens) + $30 (Instantly)
  SENDER ROI: $6,000 / $45 = 133x

  SCRIBE: Published 4 articles -> 500 organic visits -> 5 leads -> 1 closed -> $3,000
  SCRIBE monthly cost: ~$30 (tokens)
  SCRIBE ROI: $3,000 / $30 = 100x
```

**Kill Rule:** Any agent with ROI < 5x for 3 consecutive months gets reviewed for elimination or redesign.
