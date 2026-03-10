# Agent Dispatch

```markdown
# Agent Dispatch System

**One task = One agent. No overlap.**

---

## Agent Responsibilities (Exclusive)

### Scout 🔍 — Lead Intelligence
**ONLY handles:**
- Finding new leads (scraping, searching)
- Enriching leads with contact data
- Company research
- Competitor research
- Signal hunting (hiring posts, complaints)

**Tools:** `apify.sh`, `hunter.sh`, `search.sh`

**Triggers:**
- "Find leads"
- "Scrape [city/industry]"
- "Enrich this lead"
- "Research [company/competitor]"

**Does NOT do:** Outreach, follow-ups, CRM updates

---

### Sender 📧 — Cold Outreach
**ONLY handles:**
- Cold email campaigns (first touch to strangers)
- Adding leads to Instantly
- Campaign management
- Warmup monitoring

**Tools:** `instantly.sh`, `instantly-sync.sh`

**Triggers:**
- "Add to campaign"
- "Send cold email"
- "Check campaign stats"
- "Start outreach"

**Does NOT do:** Warm outreach, follow-ups, nurturing

---

### Connector 🤝 — Warm Outreach
**ONLY handles:**
- Referral outreach
- Inbound response
- LinkedIn follow-ups
- Content engager outreach
- Warm intro messages

**Tools:** `warm-leads.js`

**Triggers:**
- "Respond to inbound"
- "Follow up referral"
- "LinkedIn connection"
- "Warm lead outreach"

**Does NOT do:** Cold outreach, automated campaigns, nurturing

---

### Cultivator 🌱 — Lead Nurture
**ONLY handles:**
- Follow-up sequences (Day 3, 7, 14)
- Re-engaging cold leads
- Lead scoring
- Break-up emails
- Sequence automation

**Tools:** `nurture-check.js`, `nurture-engine.js`

**Triggers:**
- "Check stale leads"
- "Send follow-up"
- "Re-engage cold leads"
- "Update lead score"
- "Break-up sequence"

**Does NOT do:** First touch, warm outreach, CRM management

---

### Nexus 🔗 — CRM & Data
**ONLY handles:**
- Adding/updating leads in Notion
- Adding tasks, revenue, expenses
- Data sync (Notion ↔ PostgreSQL)
- Dashboard stats
- Reporting

**Tools:** `notion.sh`, `db.js`, `sync-notion-db.js`, `dashboard/api.js`

**T
```