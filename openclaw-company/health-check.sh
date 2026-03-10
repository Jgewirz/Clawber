#!/bin/bash
# health-check.sh — OptAImum OpenClaw Diagnostic Script
# Run: bash health-check.sh

echo "============================================"
echo "  OptAImum OpenClaw — Health Check"
echo "  $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "============================================"
echo ""

PASS=0
WARN=0
FAIL=0

check_pass() { echo "  [PASS] $1"; ((PASS++)); }
check_warn() { echo "  [WARN] $1"; ((WARN++)); }
check_fail() { echo "  [FAIL] $1"; ((FAIL++)); }

# 1. OpenClaw installed
echo "--- OpenClaw ---"
if command -v openclaw &>/dev/null; then
    check_pass "OpenClaw installed: $(openclaw --version 2>/dev/null || echo 'yes')"
else
    check_fail "OpenClaw not installed"
fi

# 2. Gateway status
echo ""
echo "--- Gateway ---"
if openclaw gateway status &>/dev/null; then
    check_pass "Gateway running"
else
    check_fail "Gateway not running"
fi

# 3. Config file
echo ""
echo "--- Configuration ---"
CONFIG="$HOME/.openclaw/openclaw.json"
if [ -f "$CONFIG" ]; then
    check_pass "openclaw.json exists"
    # Check for agents list
    if grep -q '"list"' "$CONFIG" 2>/dev/null; then
        AGENT_LIST_COUNT=$(grep -c '"id":' "$CONFIG" 2>/dev/null || echo 0)
        if [ "$AGENT_LIST_COUNT" -ge 13 ]; then
            check_pass "Agent list: $AGENT_LIST_COUNT agents configured"
        else
            check_warn "Agent list: only $AGENT_LIST_COUNT agents (expected 14)"
        fi
    else
        check_fail "No agents.list in config"
    fi
    # Check for env vars
    if grep -q '"env"' "$CONFIG" 2>/dev/null; then
        check_pass "Environment variables configured"
    else
        check_warn "No env vars in config"
    fi
    # Check for skills path
    if grep -q '"extraDirs"' "$CONFIG" 2>/dev/null; then
        check_pass "Skills path configured"
    else
        check_warn "No skills.load.extraDirs in config"
    fi
else
    check_fail "openclaw.json not found at $CONFIG"
fi

# 4. Agent workspaces
echo ""
echo "--- Agent Workspaces ---"
AGENTS="claw forge amplify scout sender nexus cultivator connector ranker scribe herald oracle compass sentinel"
for agent in $AGENTS; do
    WS="$HOME/.openclaw/agents/$agent/workspace"
    if [ -d "$WS" ]; then
        FILES=$(ls "$WS"/*.md 2>/dev/null | wc -l)
        if [ "$FILES" -ge 3 ]; then
            check_pass "$agent: $FILES files"
        else
            check_warn "$agent: only $FILES files (expected 3+)"
        fi
    else
        check_fail "$agent: workspace not found"
    fi
done

# 5. Cron jobs
echo ""
echo "--- Cron Jobs ---"
if openclaw gateway status &>/dev/null; then
    CRON_COUNT=$(openclaw cron list 2>/dev/null | grep -c "cron" || echo 0)
    if [ "$CRON_COUNT" -ge 15 ]; then
        check_pass "$CRON_COUNT cron jobs registered"
    elif [ "$CRON_COUNT" -gt 0 ]; then
        check_warn "$CRON_COUNT cron jobs (expected 15)"
    else
        check_fail "No cron jobs registered"
    fi
else
    check_warn "Cannot check cron jobs (gateway not running)"
fi

# 6. Skills directory
echo ""
echo "--- Skills ---"
SKILL_DIR="$HOME/Desktop/Clawdbot/skills"
if [ -d "$SKILL_DIR" ]; then
    SKILL_COUNT=$(ls -d "$SKILL_DIR"/*/ 2>/dev/null | wc -l)
    if [ "$SKILL_COUNT" -gt 0 ]; then
        check_pass "$SKILL_COUNT skills found in $SKILL_DIR"
    else
        check_warn "Skills directory exists but empty"
    fi
else
    check_warn "Skills directory not found at $SKILL_DIR"
fi

# 7. .env file
echo ""
echo "--- Environment ---"
ENV_FILE="$HOME/Desktop/Clawdbot/.env"
if [ -f "$ENV_FILE" ]; then
    check_pass ".env file exists"
    # Check key vars exist (without revealing values)
    for var in NOTION_API_KEY BRAVE_API_KEY APIFY_TOKEN INSTANTLY_API_KEY PGHOST TELEGRAM_BOT_TOKEN; do
        if grep -q "^${var}=" "$ENV_FILE" 2>/dev/null; then
            check_pass "$var configured"
        else
            check_warn "$var missing from .env"
        fi
    done
else
    check_fail ".env file not found at $ENV_FILE"
fi

# Summary
echo ""
echo "============================================"
echo "  HEALTH CHECK SUMMARY"
echo ""
echo "  PASS: $PASS"
echo "  WARN: $WARN"
echo "  FAIL: $FAIL"
echo ""
if [ "$FAIL" -eq 0 ] && [ "$WARN" -eq 0 ]; then
    echo "  STATUS: ALL SYSTEMS GO"
elif [ "$FAIL" -eq 0 ]; then
    echo "  STATUS: OPERATIONAL (with warnings)"
else
    echo "  STATUS: ISSUES DETECTED — review failures above"
fi
echo "============================================"
