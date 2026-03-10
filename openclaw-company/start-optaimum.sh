#!/bin/bash
# start-optaimum.sh — Start OptAImum OpenClaw Gateway + Register Cron Jobs
# Run: bash start-optaimum.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "============================================"
echo "  OptAImum OpenClaw — Full Startup"
echo "============================================"
echo ""

# Step 1: Check OpenClaw is installed
if ! command -v openclaw &>/dev/null; then
    echo "ERROR: OpenClaw not installed. Run: npm install -g openclaw@latest"
    exit 1
fi
echo "[1/4] OpenClaw found: $(openclaw --version 2>/dev/null || echo 'unknown')"

# Step 2: Start gateway
echo "[2/4] Starting gateway..."
if openclaw gateway status &>/dev/null; then
    echo "  Gateway already running."
else
    openclaw gateway run --bind loopback --port 18789 --force &
    GATEWAY_PID=$!
    echo "  Gateway starting (PID: $GATEWAY_PID)..."
    sleep 5

    if openclaw gateway status &>/dev/null; then
        echo "  Gateway is UP."
    else
        echo "  WARNING: Gateway may still be initializing. Waiting 5 more seconds..."
        sleep 5
    fi
fi

# Step 3: Register cron jobs
echo "[3/4] Registering cron jobs..."
bash "$SCRIPT_DIR/bootstrap-optaimum.sh"

# Step 4: Verify
echo ""
echo "[4/4] Verification..."
echo ""
echo "--- Cron Jobs ---"
openclaw cron list 2>/dev/null || echo "  (run 'openclaw cron list' manually to verify)"
echo ""
echo "--- Agent Workspaces ---"
AGENT_COUNT=$(ls -d ~/.openclaw/agents/*/workspace 2>/dev/null | wc -l)
echo "  Agent workspaces found: $AGENT_COUNT/14"
echo ""
echo "--- Skills ---"
SKILL_DIR="$HOME/Desktop/Clawdbot/skills"
if [ -d "$SKILL_DIR" ]; then
    SKILL_COUNT=$(ls -d "$SKILL_DIR"/*/ 2>/dev/null | wc -l)
    echo "  Skills found: $SKILL_COUNT in $SKILL_DIR"
else
    echo "  WARNING: Skills directory not found at $SKILL_DIR"
fi

echo ""
echo "============================================"
echo "  STARTUP COMPLETE"
echo ""
echo "  Next steps:"
echo "  1. Send /start to your Telegram bot to pair"
echo "  2. Get your chat ID and add to openclaw.json"
echo "  3. Test: openclaw cron run claw-morning-briefing"
echo "============================================"
