# Paperclip Integration — Governance Control Plane

## What It Replaces

The 10 architecture docs (`01-10_*.md`) become historical reference. Paperclip's database becomes the live system of record for:
- Org chart (agent hierarchy)
- Budget allocation and enforcement
- Approval gates
- Audit logs

Notion remains the CRM and content approval queue.

## Setup

### Option A: Docker (recommended)

```bash
cd ~/Desktop/Brain
docker compose up paperclip-db paperclip -d
```

### Option B: Dev mode with embedded PGlite

```bash
cd ~/Desktop/paperclip
pnpm install
pnpm dev
```

### Verify

```bash
curl http://localhost:3100/api/health
```

Expected: `{"status":"ok","deploymentMode":"local_trusted",...}`

## Ports

| Port | Service |
|------|---------|
| 3100 | Paperclip API + UI |
| 5433 | Paperclip Postgres (Docker only) |

## Seed Company & Agents

After Paperclip is running, seed the OptAImum company:

```bash
# Create company
curl -X POST http://localhost:3100/api/companies \
  -H "Content-Type: application/json" \
  -d @integrations/paperclip/company-seed.json

# Verify org chart
curl http://localhost:3100/api/companies/{companyId}/org
```

## OpenClaw Onboarding

Full checklist in `~/Desktop/paperclip/doc/OPENCLAW_ONBOARDING.md`.

1. Generate invite prompt: `POST /api/companies/{companyId}/openclaw/invite-prompt`
2. Paste into OpenClaw main chat
3. Approve join request + device pairing
4. Test: create a task in Paperclip assigned to OpenClaw agent
5. Verify agent executes task

## Key API Endpoints

- `GET /api/health` — Health check
- `GET /api/companies` — List companies
- `POST /api/companies` — Create company
- `POST /api/companies/{id}/agents` — Create agent
- `GET /api/companies/{id}/org` — Org chart
- `POST /api/companies/{id}/openclaw/invite-prompt` — OpenClaw invite

## Environment Variables

- `DATABASE_URL` — External Postgres connection (optional, uses embedded PGlite if omitted)
- `PAPERCLIP_DEPLOYMENT_MODE` — `local_trusted` (default) or `authenticated`
- `BETTER_AUTH_SECRET` — Required for authenticated mode
- `SERVE_UI` — `true` to serve the web UI (default)
