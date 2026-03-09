# OUTPUT 9 — SCALING PLAN

## Scaling from 13 Agents to 100+

---

## Phase 1: Foundation (Current — 13 Agents)

```
Agents: CLAW, FORGE, AMPLIFY, SCOUT, SENDER, NEXUS, CULTIVATOR,
        CONNECTOR, RANKER, SCRIBE, HERALD, ORACLE, COMPASS, SENTINEL

Infrastructure:
  - Single OpenClaw gateway (local)
  - Neon PostgreSQL (free tier)
  - Notion CRM (free/personal)
  - 15 cron jobs
  - ~500K tokens/day budget

Capacity:
  - 50 leads/week
  - 50 outreach emails/week
  - 4 articles/month
  - 5 social posts/week
```

---

## Phase 2: Vertical Expansion (20-30 Agents)

**When to scale:** Revenue exceeds $5K/month or lead volume needs exceed Phase 1 capacity.

### New Agent Roles

| Agent | Codename | Purpose |
|-------|----------|---------|
| Sales Closer | **APEX** | Handle qualified leads, proposal generation |
| Account Manager | **STEWARD** | Existing client management, upsell |
| Finance | **LEDGER** | Expense tracking, invoicing, P&L |
| Legal/Compliance | **SHIELD** | Contract review, compliance checks |
| Hiring | **TALENT** | Contractor sourcing, onboarding |
| Customer Success | **PULSE** | Onboarding, health scores, churn prevention |
| Data Analyst | **PRISM** | Deep analytics, trend analysis |

### Infrastructure Changes

```yaml
upgrade:
  database: Neon Pro (dedicated compute)
  notion: Notion Team plan (more API calls)
  openclaw: Render.com deployment (always-on)
  email: Instantly Growth plan (more sending capacity)
  enrichment: Hunter.io Business plan (more credits)

new_tools:
  - Stripe API (payment processing)
  - Calendly API (meeting scheduling)
  - Loom API (video proposals)
  - DocuSign API (contract signing)
```

---

## Phase 3: Horizontal Expansion (30-50 Agents)

**When to scale:** Multiple clients, multiple verticals, or agency model.

### Multi-Client Architecture

```
[CLAW — CEO]
    |
    +--- [CLIENT_A_TEAM]
    |       ├── SCOUT_A (leads for Client A)
    |       ├── SENDER_A (outreach for Client A)
    |       └── CULTIVATOR_A (nurture for Client A)
    |
    +--- [CLIENT_B_TEAM]
    |       ├── SCOUT_B
    |       ├── SENDER_B
    |       └── CULTIVATOR_B
    |
    +--- [SHARED_SERVICES]
            ├── NEXUS (shared CRM)
            ├── SENTINEL (shared monitoring)
            ├── RANKER (shared SEO)
            └── SCRIBE (shared content)
```

### Namespacing

```bash
# Agents get namespace prefixes
openclaw cron add --name "client-a/scout-lead-hunt" ...
openclaw cron add --name "client-b/scout-lead-hunt" ...

# Separate Notion databases per client
# Separate Instantly campaigns per client
# Shared PostgreSQL with client_id column
```

---

## Phase 4: Full Autonomous Company (50-100+ Agents)

**When to scale:** Platform revenue exceeds $50K/month.

### Multi-Gateway Architecture

```
[Load Balancer]
    |
    +--- Gateway A (Sales agents)
    |       Port: 18789
    |       Agents: SCOUT, SENDER, CULTIVATOR, CONNECTOR
    |
    +--- Gateway B (Marketing agents)
    |       Port: 18790
    |       Agents: RANKER, SCRIBE, HERALD, ORACLE
    |
    +--- Gateway C (Operations agents)
    |       Port: 18791
    |       Agents: NEXUS, SENTINEL, LEDGER, PRISM
    |
    +--- Gateway D (Executive agents)
            Port: 18792
            Agents: CLAW, FORGE, AMPLIFY, COMPASS
```

### Infrastructure at Scale

```yaml
compute:
  - 4x OpenClaw gateways on Render.com (Standard plan each)
  - Redis cluster for inter-gateway messaging
  - Neon Pro database (auto-scaling)

storage:
  - PostgreSQL for structured data
  - S3/R2 for generated content, screenshots, reports
  - Notion as human-facing interface only (agents use PostgreSQL)

messaging:
  - Telegram (primary human channel)
  - Slack workspace (inter-agent communication)
  - Discord (community/support)

monitoring:
  - SENTINEL on each gateway
  - Centralized logging (PostgreSQL)
  - Alert escalation via Telegram
```

---

## Scaling Patterns

### 1. Agent Cloning

When one agent is overloaded, clone it with a numeric suffix:

```bash
# SCOUT can't keep up with lead volume
# Clone into SCOUT-1, SCOUT-2, SCOUT-3
# Each handles a different geography or industry

SCOUT-1: SaaS companies in US
SCOUT-2: Marketing agencies in US
SCOUT-3: Sales-driven SMBs in UK/EU
```

### 2. Agent Specialization

When an agent's scope grows too broad, split it:

```
SCRIBE (writes everything)
  |
  +---> SCRIBE-BLOG (long-form SEO content)
  +---> SCRIBE-EMAIL (email copy and newsletters)
  +---> SCRIBE-LANDING (landing page copy)
  +---> SCRIBE-CASE (case study writer)
```

### 3. Agent Hierarchy Deepening

When a department grows, add managers:

```
AMPLIFY (CMO)
  |
  +--- GROWTH_LEAD (manages SCOUT, SENDER, CULTIVATOR)
  |       ├── SCOUT-1, SCOUT-2
  |       ├── SENDER-1, SENDER-2
  |       └── CULTIVATOR
  |
  +--- CONTENT_LEAD (manages RANKER, SCRIBE, HERALD)
          ├── RANKER
          ├── SCRIBE-BLOG, SCRIBE-EMAIL
          └── HERALD-LINKEDIN, HERALD-TWITTER
```

---

## Scaling Milestones

| Revenue | Agents | Gateways | Database | Key Unlock |
|---------|--------|----------|----------|------------|
| $0-2K | 13 | 1 (local) | Neon Free | Validate pipeline works |
| $2K-5K | 20 | 1 (Render) | Neon Free | First paying clients |
| $5K-15K | 30 | 2 | Neon Starter | Multi-client support |
| $15K-50K | 50 | 3 | Neon Pro | Department specialization |
| $50K+ | 100+ | 4+ | Neon Pro + Redis | Full autonomous company |

---

## What NOT to Scale

1. **Don't add agents for agent's sake.** Every agent has a cost. Only add when there's a clear capacity or capability gap.
2. **Don't break the human-in-the-loop.** Even at 100 agents, outbound comms always need approval.
3. **Don't distribute what doesn't need distribution.** One NEXUS can handle 100+ agents' CRM writes until proven otherwise.
4. **Don't over-orchestrate.** OpenClaw's cron + heartbeat is sufficient. No need for Kafka, Airflow, or external workflow engines until you're past 100 agents.
