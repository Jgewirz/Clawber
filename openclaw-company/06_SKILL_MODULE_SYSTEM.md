# OUTPUT 6 — SKILL MODULE SYSTEM

## How Agents Load and Use Skills

OpenClaw skills are **modular capability packages** that agents load at runtime. Skills live in the `skills/` directory and are managed via ClawHub or local installation.

---

## Skill Architecture

```
~/.openclaw/
├── skills/               # Installed skills (shared across agents)
│   ├── lead-generation/
│   │   ├── skill.md      # Skill definition (instructions + tools)
│   │   └── tools/        # Optional tool scripts
│   ├── seo/
│   ├── sales/
│   └── ...
├── agents/               # Agent-specific configs
│   ├── scout/
│   │   └── skills.yaml   # Skills this agent can use
│   ├── sender/
│   └── ...
└── cron/                 # Scheduled jobs
```

---

## Installed Skills — 90 Total (14 Core + 65 PM + 11 GEO)

### Core Skills (14 from Clawdbot)

| Skill | Category | Agents That Use It |
|-------|----------|-------------------|
| `lead-generation` | Sales | SCOUT, CULTIVATOR, AMPLIFY |
| `sales` | Sales | SENDER, CULTIVATOR, CONNECTOR, AMPLIFY |
| `seo` | Marketing | RANKER, SCRIBE, AMPLIFY |
| `seo-competitor-analysis` | Marketing | RANKER, ORACLE, FORGE |
| `content-ideas` | Marketing | SCRIBE, HERALD, AMPLIFY, COMPASS |
| `agent-content-pipeline` | Marketing | SCRIBE, AMPLIFY |
| `linkedin` | Social | HERALD, CONNECTOR |
| `twitter` | Social | HERALD |
| `instagram-marketing` | Social | HERALD |
| `gmail` | Communication | SENDER, CULTIVATOR |
| `gmail-inbox-zero-triage` | Communication | CLAW, FORGE |
| `clawpify` | E-commerce | CLAW (revenue monitoring) |
| `shopify-admin-api` | E-commerce | CLAW (revenue monitoring) |
| `calendar` | Operations | CLAW, COMPASS |

### PM Skills (65 from phuryn/pm-skills) — See external skill packs section below

### GEO/SEO Skills (11 from geo-seo-claude) — See external skill packs section below

---

## External Skill Packs (Replacing Custom Builds)

The 5 planned custom skills have been replaced by two external skill packs providing **76 proven community skills**:

### PM Skills (65 skills, 8 plugins) — `phuryn/pm-skills`

Replaces all 5 planned custom skills with battle-tested alternatives:

| Planned Skill | Replaced By | # Skills |
|--------------|-------------|----------|
| `market-research` | `pm-market-research` plugin | 7 |
| `product-strategy` | `pm-product-strategy` plugin | 12 |
| `growth-loop-design` | `pm-go-to-market` plugin | 6 |
| `experimentation-design` | `pm-data-analytics` plugin | 3 |
| `okr-planning` | `pm-execution` plugin | 15 |
| (bonus) | `pm-product-discovery` plugin | 13 |
| (bonus) | `pm-marketing-growth` plugin | 5 |
| (bonus) | `pm-toolkit` plugin | 4 |

**Installation:** See `integrations/pm-skills/README.md`

**Agent assignments:**

| Agent | PM Plugins |
|-------|-----------|
| COMPASS | pm-product-discovery, pm-product-strategy, pm-execution |
| AMPLIFY | pm-marketing-growth, pm-go-to-market |
| ORACLE | pm-market-research |
| CLAW | pm-product-strategy (strategic reference) |

### GEO/SEO Skills (11 skills) — `zubair-trabzada/geo-seo-claude`

New AI search optimization skills for RANKER and supporting agents:

| Skill | Purpose |
|-------|---------|
| geo-audit | Full GEO + SEO audit orchestration |
| geo-citability | AI citation readiness scoring |
| geo-crawlers | AI crawler access analysis (14+ crawlers) |
| geo-llmstxt | llms.txt standard analysis & generation |
| geo-brand-mentions | Brand presence scanning |
| geo-platform-optimizer | Platform-specific optimization (ChatGPT, Perplexity, AIO) |
| geo-schema | Structured data (JSON-LD) detection & generation |
| geo-technical | Technical SEO audit (Core Web Vitals, mobile, security) |
| geo-content | Content quality & E-E-A-T assessment |
| geo-report | Markdown report generation |
| geo-report-pdf | PDF reports with charts & visualizations |

**Installation:** Requires Python 3.8+. See `integrations/geo-seo/README.md`

**Agent assignments:**

| Agent | GEO Skills |
|-------|-----------|
| RANKER (primary) | All 11 skills |
| SCRIBE | geo-content, geo-citability |
| ORACLE | geo-brand-mentions, geo-crawlers |

---

## Skill Loading Mechanism

When an agent's cron job fires, the gateway:

1. Reads the agent's config to determine which skills are assigned
2. Loads each skill's `skill.md` into the agent's system prompt context
3. Makes skill-defined tools available to the agent
4. Agent executes using skill instructions as operational guidelines

### Example: RANKER loads `seo` skill

```
Gateway fires cron job "ranker-keyword-research"
  |
  v
Load agent config: RANKER
  |
  v
Skills: [seo, seo-competitor-analysis]
  |
  v
Read skills/seo/skill.md -> inject into system prompt
Read skills/seo-competitor-analysis/skill.md -> inject into system prompt
  |
  v
Make tools available: [brave-search, notion]
  |
  v
Execute agent with full context
```

---

## Installing New Skills

### From ClawHub (recommended)
```bash
openclaw skill install market-research
openclaw skill install product-strategy
openclaw skill install growth-loop-design
```

### Local development
```bash
# Create skill directory
mkdir -p skills/market-research

# Write skill definition
cat > skills/market-research/skill.md << 'EOF'
# market-research
[skill content]
EOF

# Verify
openclaw skill list
```

---

## Skill → Agent Assignment Matrix

```
              lead  sales  seo  seo-  content  content  linkedin  twitter  insta  gmail  gmail-  clawpify  shopify  calendar  market-  product-  growth-  exp-  okr-
              gen                comp  ideas    pipeline                            triage                          research  strategy  loop     design plan
CLAW                                                                                       X        X       X      X                                          X
FORGE                            X                                                 X
AMPLIFY       X     X      X          X        X                                                                   X                  X        X
SCOUT         X                  X                                                                                 X
SENDER              X                                                     X
CONNECTOR           X                                    X
CULTIVATOR    X     X
NEXUS
RANKER               X    X
SCRIBE                     X          X        X
HERALD                               X                  X        X       X
ORACLE                         X     X                                                                    X
COMPASS                               X                                                          X        X                  X        X
SENTINEL
```
