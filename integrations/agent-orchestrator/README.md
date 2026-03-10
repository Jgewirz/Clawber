# Agent Orchestrator Integration — Event-Driven Layer

## What It Adds

Agent Orchestrator (AO) adds **reactive, event-driven orchestration** to complement the existing cron-based scheduling. Cron handles time-based work; AO handles event-driven work.

| Trigger Type | Handler | Example |
|-------------|---------|---------|
| Scheduled | Cron (15 jobs) | Morning briefing at 7AM, weekly SEO |
| Reactive | Agent Orchestrator | Lead found -> trigger NEXUS + SENDER |
| Error | Agent Orchestrator | System error -> escalate to FORGE |
| PR/CI | Agent Orchestrator | CI failed -> notify, auto-retry |

## Setup

AO runs **natively on the host** (not Docker) because it needs filesystem access and tmux sessions.

```bash
cd ~/Desktop/agent-orchestrator
pnpm install
pnpm build

# Link CLI globally
npm link -g packages/cli

# Create config
cp ~/Desktop/Brain/integrations/agent-orchestrator/agent-orchestrator.yaml ./agent-orchestrator.yaml

# Start
npx ao
```

## Verify

- Dashboard: http://localhost:3000
- Test escalation webhook reaches OpenClaw

## Ports

| Port | Service |
|------|---------|
| 3000 | AO web dashboard |
| 14800 | Terminal iframe WebSocket |
| 14801 | Direct terminal WebSocket |

## OpenClaw Gateway Configuration

Add to OpenClaw config to accept AO session keys:

```json
{
  "hooks": {
    "enabled": true,
    "token": "<OPENCLAW_HOOKS_TOKEN>",
    "allowRequestSessionKey": true,
    "allowedSessionKeyPrefixes": ["hook:ao:"]
  }
}
```

## Coexistence with Cron

All 15 cron jobs from `bootstrap-optaimum.sh` stay unchanged. AO supplements them:

- **Cron**: SCOUT runs every 30min to find leads
- **AO**: When SCOUT finds a high-score lead, AO immediately triggers NEXUS + SENDER (no waiting for next cron cycle)
- **Cron**: SENTINEL runs every 6h for health checks
- **AO**: If SENTINEL detects an error, AO escalates to FORGE immediately

## Environment Variables

```bash
OPENCLAW_HOOKS_TOKEN=<token matching OpenClaw hooks config>
GH_TOKEN=<GitHub token, if using GitHub tracker>
```
