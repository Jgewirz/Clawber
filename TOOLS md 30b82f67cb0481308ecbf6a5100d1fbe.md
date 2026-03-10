# TOOLS.md

```markdown
# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## APIs

### Notion
- **API Key:** `<REDACTED — set in .env as NOTION_API_KEY>`
- **Use:** CRM, calendar, content management

**Databases:**
| Name | ID |
|------|-----|
| Leads CRM | `b4f8cebc-ebe1-4cbc-a258-b09fd2fcef06` |
| Outreach Queue | `3cfad16d-d42c-4bb8-afba-a2375a3fd033` |
| Content Calendar | `f34cbd0a-44f2-4c61-908f-7b24e0b9e685` |
| Social Content | `86beb9ac-908c-44ab-83bc-746ee8d035f0` |
| Tasks | `88a9c104-9686-458e-92b5-ecc9cd2c11d5` |
| Revenue | `30a82f67-cb04-8157-b026-e18c14d3574c` |
| Expenses | `30a82f67-cb04-81ab-bfe5-dec9ce944ab0` |
| Weekly Reports | `b7658b64-8246-4143-bedb-f2fe53aaddb4` |
| Monthly Reports | `9013db02-9af8-40ae-a38b-2996aebb40a8` |

### Hunter.io
- **Credits:** 36 remaining (free plan)
- **API Key:** `<REDACTED — set in .env as HUNTER_API_KEY>`

### Apify
- **Token:** `<REDACTED — set in .env as APIFY_TOKEN>`

### Brave Search
- **API Key:** `<REDACTED — set in .env as BRAVE_API_KEY>`
- **Use:** Web research, competitor monitoring, lead signals

### Instantly.ai
- **API Key:** `<REDACTED — set in .env as INSTANTLY_API_KEY>`
- **Campaign ID:** `<REDACTED — set in .env as INSTANTLY_CAMPAIGN_ID>`

### PostgreSQL (Neon)
- **Host:** `<REDACTED — set in .env as PGHOST>`
- **Database:** `<REDACTED — set in .env as PGDATABASE>`
- **User:** `<REDACTED — set in .env as PGUSER>`
- **Password:** `<REDACTED — set in .env as PGPASSWORD>`
- **SSL Mode:** `require`
- **Use:** Analytics, historical data, fast queries

---

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

All credentials belong in `.env` (never committed). This file only references them.

---

Add whatever helps you do your job. This is your cheat sheet.

```
