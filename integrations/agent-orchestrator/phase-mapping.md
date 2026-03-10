# Agent Orchestrator Phase Mapping

## How AO Phases Map to OptAImum Workflows

### Phase 0: Webhook Events (Primary Use)

AO listens for events and routes them to the right agent:

| Event | AO Action | Target Agent |
|-------|-----------|-------------|
| High-score lead found | Create session | NEXUS -> SENDER |
| Cold email reply received | Create session | CONNECTOR |
| System error detected | Escalate | FORGE |
| Content approved in Notion | Notify | HERALD |
| Campaign performance drop | Alert | AMPLIFY |

### Phase 1: Agent Session Management

AO spawns and monitors agent sessions:

```
ao spawn optaimum <issue-number>
```

Each spawn creates an isolated session with the Brain repo context.

### Phase 2: CI/PR Integration (Future)

When agents create PRs:
- CI fails -> AO auto-retries (up to 2x)
- Changes requested -> AO routes back to agent
- Approved + green -> AO notifies for merge

### Cron vs AO Decision Matrix

| Use Cron When... | Use AO When... |
|-----------------|----------------|
| Fixed schedule needed | Reacting to an event |
| No external trigger | Triggered by webhook/API |
| Predictable workload | Variable/burst workload |
| Simple fire-and-forget | Need retry/escalation logic |
