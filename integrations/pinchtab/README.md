# PinchTab Integration — Browser Automation

## What It Adds

PinchTab provides token-efficient browser automation via HTTP/JSON API. Compared to Playwright screenshots:
- **~800 tokens/page** (text extraction) vs **~5,000+ tokens** (screenshot) = **5-13x savings**
- Estimated savings: **20K-40K tokens/day**

## Setup

### Start via Docker Compose

```bash
cd ~/Desktop/Brain
docker compose up pinchtab -d
```

### Verify

```bash
curl http://localhost:9867/health
```

Expected: `{"status":"ok","tabs":0}`

## Port

| Port | Service |
|------|---------|
| 9867 | PinchTab browser automation API |

## OpenClaw Plugin Installation

Copy the plugin from the pinchtab repo into OpenClaw's plugin directory:

```bash
cp -r ~/Desktop/pinchtab/plugin/ ~/.openclaw/plugins/pinchtab/
```

Configure in OpenClaw:

```json
{
  "plugins": {
    "entries": {
      "pinchtab": {
        "enabled": true,
        "config": {
          "baseUrl": "http://localhost:9867",
          "token": "<PINCHTAB_TOKEN>",
          "timeout": 30000
        }
      }
    }
  }
}
```

### Test

```bash
# Navigate to a page
curl -X POST http://localhost:9867/action \
  -H "Authorization: Bearer <PINCHTAB_TOKEN>" \
  -d '{"action":"navigate","url":"https://example.com"}'

# Extract text (token-efficient)
curl -X POST http://localhost:9867/action \
  -H "Authorization: Bearer <PINCHTAB_TOKEN>" \
  -d '{"action":"text"}'
```

## Agent Assignments

| Agent | PinchTab Use |
|-------|-------------|
| SCOUT | Competitor website extraction, LinkedIn research |
| ORACLE | Competitor homepage change monitoring |
| RANKER | SERP analysis alongside Brave Search |
| SENDER | Instantly.ai dashboard monitoring |

## Available Actions

`navigate`, `snapshot`, `click`, `type`, `press`, `fill`, `text`, `screenshot`, `evaluate`, `pdf`, `health`

## Docker Requirements

- `shm_size: 2gb` (required for Chrome stability)
- `seccomp: unconfined` (required for Chrome in container)
- `mem_limit: 2g`, `cpus: 2.0`

## Environment Variables

- `BRIDGE_TOKEN` / `PINCHTAB_TOKEN` — Bearer auth token
- `BRIDGE_HEADLESS` — `true` for headless Chrome (default)
- `BRIDGE_MAX_TABS` — Max open tabs (default: 20)
- `BRIDGE_STEALTH` — Stealth level: `light` (default)
