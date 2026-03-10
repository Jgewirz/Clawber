# Nexus - CRM

```markdown
# CRM Agent - Nexus 🔗

**Role:** Central nervous system for OptAImum's sales operations  
**Location:** `agents/crm/`

## Purpose

Nexus manages the automated CRM pipeline:
- Ingests leads from daily hunt
- Syncs outreach status with Instantly.ai
- Tracks revenue and expenses
- Maintains pipeline health
- Generates reports

## Notion Databases

| Database | ID | Purpose |
|----------|-----|---------|
| 👥 Leads CRM | `b4f8cebc-ebe1-4cbc-a258-b09fd2fcef06` | All prospects |
| 📤 Outreach Queue | `3cfad16d-d42c-4bb8-afba-a2375a3fd033` | Email/DM tracking |
| 📅 Content Calendar | `f34cbd0a-44f2-4c61-908f-7b24e0b9e685` | Content schedule |
| 📱 Social Content | `86beb9ac-908c-44ab-83bc-746ee8d035f0` | Social drafts |
| ✅ Tasks | `88a9c104-9686-458e-92b5-ecc9cd2c11d5` | Action items |
| 💰 Revenue | `30a82f67-cb04-8157-b026-e18c14d3574c` | Income tracking |
| 💸 Expenses | `30a82f67-cb04-81ab-bfe5-dec9ce944ab0` | Cost tracking |
| 📊 Weekly Reports | `b7658b64-8246-4143-bedb-f2fe53aaddb4` | Weekly summaries |
| 📈 Monthly Reports | `9013db02-9af8-40ae-a38b-2996aebb40a8` | Monthly summaries |

## Lead Pipeline

```
New → Contacted → Qualified → Proposal → Won/Lost
```

**Status Mapping (Instantly → Notion):**
- `not_yet_contacted` → New
- `contacted` → Contacted
- `replied` → Qualified
- `interested` / `meeting_booked` → Proposal
- `closed` → Won
- `not_interested` / `unsubscribed` → Lost

## Tools

### notion.sh
Full CRUD operations on all Notion databases.

```bash
# Add a lead
./tools/notion.sh add-lead "John Doe" "Acme Corp" "john@acme.com" "+1234567890" "New"

# Update lead status
./tools/notion.sh update-lead "page-id" "Contacted"

# Add outreach
./tools/notion.sh add-outreach "John Doe" "Cold email sequence" "2026-02-18" "Queued"

# Add content
./tools/notion.sh add-content "Twitter Thread: AI Automation" "2026-02-20" "Social Media" "Planned"

# Add task
./tools/notion.sh add-task "Follow up with Blackhawk" "2026-
```