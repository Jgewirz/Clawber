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

## Installed Skills (14 from Clawdbot)

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

---

## New Skills to Build (Product Management Suite)

Based on PM skills patterns, create these as OpenClaw skills:

### `market-research` Skill

```markdown
# market-research

## Description
Conduct structured market research using web search, competitor analysis, and trend identification.

## Tools
- brave-search: Web research queries
- notion: Store findings
- memory-core: Track research history

## Instructions
When activated, follow this research framework:
1. Define research question
2. Search for primary data (Brave Search)
3. Analyze competitor landscape
4. Identify market trends
5. Score opportunities (TAM/SAM/SOM)
6. Output structured findings to Notion

## Output Format
| Finding | Source | Impact | Confidence |
|---------|--------|--------|------------|
| [data]  | [url]  | H/M/L  | H/M/L      |
```

### `product-strategy` Skill

```markdown
# product-strategy

## Description
Generate product strategy documents including positioning, differentiation, and roadmap recommendations.

## Instructions
1. Analyze current product capabilities
2. Map competitive landscape
3. Identify differentiation opportunities
4. Draft positioning statement
5. Recommend roadmap priorities (RICE scoring)
6. Output to Notion Tasks

## Frameworks
- Jobs-to-be-Done analysis
- RICE prioritization (Reach, Impact, Confidence, Effort)
- Blue Ocean Strategy canvas
- Value Proposition Canvas
```

### `growth-loop-design` Skill

```markdown
# growth-loop-design

## Description
Design and analyze growth loops for sustainable user acquisition.

## Instructions
1. Map current acquisition channels
2. Identify loop mechanics (viral, content, paid, sales-led)
3. Model loop economics (CAC, LTV, payback period)
4. Design experiments to test loop hypotheses
5. Output experiment cards to Notion

## Loop Types
- Content Loop: Create -> Rank -> Traffic -> Leads -> Content ideas
- Referral Loop: User -> Refers -> New user -> Refers
- Sales Loop: Lead -> Close -> Case study -> More leads
- Product Loop: Use -> Value -> Share -> New user
```

### `experimentation-design` Skill

```markdown
# experimentation-design

## Description
Design structured growth experiments with hypotheses, metrics, and success criteria.

## Instructions
1. State hypothesis clearly
2. Define control and variant
3. Set primary metric and minimum detectable effect
4. Calculate required sample size
5. Define success criteria
6. Set experiment duration
7. Output experiment card to Notion

## Template
Hypothesis: If we [change], then [metric] will [improve by X%]
because [reasoning].
Control: [current state]
Variant: [proposed change]
Primary Metric: [metric name]
Success Threshold: [X% improvement]
Duration: [N days/weeks]
Sample Size: [N]
```

### `okr-planning` Skill

```markdown
# okr-planning

## Description
Generate quarterly OKRs aligned with company strategy.

## Instructions
1. Review current company goals (from CLAW)
2. Assess previous quarter results
3. Draft 3-5 objectives
4. Define 2-3 key results per objective
5. Assign ownership to agents/departments
6. Output to Notion Tasks

## Format
Objective: [Bold, aspirational goal]
  KR1: [Measurable result] - Owner: [Agent]
  KR2: [Measurable result] - Owner: [Agent]
  KR3: [Measurable result] - Owner: [Agent]
```

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
