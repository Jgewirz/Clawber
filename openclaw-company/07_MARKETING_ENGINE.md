# OUTPUT 7 — MARKETING AUTOMATION ENGINE

## Growth Loop Architecture

The marketing engine is a **self-reinforcing growth system** where outputs from one agent feed inputs to others, creating compounding returns.

---

## The OptAImum Growth Flywheel

```
                    +---> CONTENT ---> TRAFFIC ---> LEADS ---+
                    |                                         |
                    |    +--- QUALIFY <--- ENRICH <---+       |
                    |    |                            |       |
                    |    v                            |       v
               CASE STUDIES                      SCOUT    NEXUS
                    |                            (hunt)   (store)
                    |                               |       |
                    +--- CLOSE <--- NURTURE <-------+       |
                              |                             |
                              +---> REVENUE -----> REINVEST-+
```

---

## Engine Components

### 1. SEO Content Machine (Autonomous)

**Agents:** RANKER -> SCRIBE -> HERALD
**Frequency:** Weekly cycle
**Goal:** 4+ SEO-optimized articles per month

```
Week Flow:
  Mon: RANKER identifies 2 keyword targets
  Tue: SCRIBE writes Article 1 draft
  Wed: Human reviews/approves
  Thu: SCRIBE writes Article 2 draft
  Fri: Human reviews/approves
  Sat: HERALD creates social distribution posts
  Sun: Rest (content scheduled for next week)
```

**Content Pillars (for OptAImum):**

| Pillar | Keywords | Content Type |
|--------|----------|--------------|
| AI Sales Automation | "AI sales tools", "automate sales process" | How-to guides |
| CRM Optimization | "CRM automation", "sales pipeline management" | Comparison posts |
| Revenue Leaks | "sales inefficiency", "revenue leaks" | Problem-solution articles |
| Case Studies | "AI consulting results", "sales automation ROI" | Social proof |
| Industry Trends | "AI in sales 2026", "sales tech trends" | Thought leadership |

**SEO Targeting Strategy:**

```yaml
tier_1_keywords:  # High intent, moderate competition
  - "AI sales automation for small business"
  - "CRM automation consulting"
  - "sales process optimization"

tier_2_keywords:  # Long tail, low competition
  - "how to automate sales follow ups"
  - "AI lead scoring for agencies"
  - "sales pipeline automation tools"

tier_3_keywords:  # Local SEO
  - "AI consulting [city]"
  - "sales automation agency near me"
  - "CRM setup services [city]"
```

---

### 2. Cold Outreach Pipeline (Human-Approved)

**Agents:** SCOUT -> NEXUS -> SENDER -> CULTIVATOR -> CONNECTOR
**Frequency:** Daily (weekdays)
**Goal:** 50+ personalized outreach emails per week

```
Daily Pipeline:

  SCOUT (every 30 min):
    - Scrape: Google Maps for marketing agencies, SaaS companies
    - Enrich: Hunter.io for decision-maker emails
    - Score: ICP fit (company size, industry, signals)
    - Output: Raw leads to NEXUS

  NEXUS (hourly):
    - Deduplicate against existing CRM
    - Assign lead score (1-100)
    - Add to Notion Leads CRM
    - Mark Status: "New"

  SENDER (9AM weekdays):
    - Query: Leads where Score > 60, Status = "New"
    - Draft: Personalized cold email using VOICE.md
    - Output: Add to Notion Outreach Queue
    - Notify: Telegram for human approval

  HUMAN:
    - Review drafts in Notion
    - Approve/edit/reject
    - Mark Status: "Approved"

  SENDER (5PM weekdays):
    - Send: Approved emails via Instantly.ai
    - Track: Opens, replies, bounces
    - Update: Lead status in Notion

  CULTIVATOR (10AM weekdays):
    - Check: Leads with no reply after 3/7/14 days
    - Draft: Follow-up emails
    - Output: To Outreach Queue for approval

  CONNECTOR (on-demand):
    - Trigger: When a lead replies
    - Action: Craft warm response
    - Goal: Book discovery call
```

**Email Sequence Templates:**

```
COLD (Day 0) — SENDER:
  Subject: {specific_pain_point} at {company}
  Body: 2 sentences max. Reference specific signal.
  CTA: "Would a 15-min call make sense?"

FOLLOW-UP 1 (Day 3) — CULTIVATOR:
  Subject: Re: {original_subject}
  Body: Add value (stat, case study). No pressure.
  CTA: "Thought you'd find this useful."

FOLLOW-UP 2 (Day 7) — CULTIVATOR:
  Subject: Quick question, {first_name}
  Body: Social proof. Specific result for similar company.
  CTA: "Want to see how we did this for {similar_company}?"

BREAKUP (Day 14) — CULTIVATOR:
  Subject: Closing the loop
  Body: Respectful close. Leave door open.
  CTA: "No worries if timing isn't right. Here if you need us."
```

---

### 3. Social Media Engine (Human-Approved)

**Agents:** HERALD + SCRIBE
**Frequency:** Tue/Thu
**Goal:** 5+ social posts per week across platforms

```
Content Distribution Matrix:

| Source Content | LinkedIn | Twitter | Instagram |
|---------------|----------|---------|-----------|
| Blog post | Long-form summary + key takeaway | Thread (3-5 tweets) | Carousel infographic |
| Case study | Detailed results post | Quick stat highlight | Before/after visual |
| Industry trend | Hot take + analysis | Quick opinion | Quote card |
| Client win | Celebration post | Short announcement | Story highlight |
| Tip/hack | "Here's what works" post | Single tweet tip | Reel/short video script |
```

**LinkedIn Post Framework (HERALD):**

```
Hook: [Bold statement or surprising stat]

Context: [2-3 sentences explaining the problem]

Solution: [What we did / what works]

Results: [Specific numbers]

Takeaway: [One actionable insight]

CTA: [Soft ask — comment, follow, DM]

#AIautomation #SalesOptimization #B2B
```

---

### 4. Competitive Intelligence Loop (Automated)

**Agents:** ORACLE + SCOUT
**Frequency:** Mon/Thu
**Goal:** Always know what competitors are doing

```
ORACLE monitors:
  - Competitor website changes (pricing, features, messaging)
  - Competitor social media activity
  - New competitors entering the market
  - Industry news and trends
  - Customer review sentiment (G2, Capterra)

SCOUT monitors:
  - Competitor job postings (hiring SDRs = growing)
  - Competitor customer complaints (opportunity signals)
  - Technology stack changes (BuiltWith)

Output:
  - Notion Competitive Analysis entries
  - High-impact alerts to CLAW
  - Content opportunities to SCRIBE
  - Outreach angles to SENDER
```

---

### 5. Lead Scoring Engine

**Agent:** NEXUS (with input from SCOUT)
**Method:** Weighted scoring against ICP

```yaml
scoring_model:
  company_signals:
    employee_count_10_200: +20
    saas_or_agency: +15
    hiring_sales_roles: +10
    using_outdated_crm: +10
    recently_funded: +10

  contact_signals:
    decision_maker_title: +15  # VP Sales, CEO, CTO, COO
    verified_email: +10
    linkedin_active: +5

  engagement_signals:
    opened_email: +5
    clicked_link: +10
    replied: +20
    visited_website: +15

  negative_signals:
    enterprise_1000_plus: -20
    no_email_found: -15
    competitor: -50
    bounced_email: -30

  thresholds:
    hot: 70+      # Immediate outreach
    warm: 40-69   # Nurture sequence
    cold: 20-39   # Low priority
    disqualified: <20  # Archive
```

---

## Growth Metrics Dashboard

NEXUS generates weekly metrics for CLAW's report:

```
WEEKLY GROWTH METRICS

Pipeline:
  New Leads Found:        [N]
  Leads Enriched:         [N]
  Leads Qualified (60+):  [N]
  Outreach Sent:          [N]
  Replies Received:       [N]
  Calls Booked:           [N]

Content:
  Articles Published:     [N]
  Social Posts Published:  [N]
  Total Impressions:      [N]
  Website Traffic:        [N]

Conversion:
  Lead → Qualified:       [X%]
  Qualified → Call:       [X%]
  Call → Proposal:        [X%]
  Proposal → Close:       [X%]

Revenue:
  New Revenue This Week:  $[X]
  Pipeline Value:         $[X]
  CAC This Month:         $[X]
```
