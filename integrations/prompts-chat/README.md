# Prompts.chat Integration — Prompt Optimization Library

## What It Adds

Community-driven prompt optimization library with MCP server. Used for:

1. **Offline prompt optimization** (primary) — Refine agent system prompts during setup using `improve_prompt` tool
2. **Runtime MCP** (secondary) — Agents call `search_prompts` on-demand for reasoning templates (~500-1000 tokens/call)

## Installation

### As Claude Code Plugin

```bash
claude plugin marketplace add f/prompts.chat
```

### As MCP Server

See the repo README at `~/Desktop/prompts.chat/README.md` for MCP configuration.

## Usage

### Offline: Optimize Agent Prompts

Use during setup to improve the system prompts in `03_AGENT_CONFIGS.md`:

```
/improve_prompt "You are SCOUT, the lead intelligence agent..."
```

The tool analyzes the prompt and suggests improvements for clarity, specificity, and token efficiency. Bake improvements into agent configs.

### Runtime: Search Prompt Templates

Agents can call `search_prompts` during execution for reasoning templates:

```
search_prompts("competitive analysis framework")
search_prompts("lead scoring methodology")
```

Low token cost (~500-1000 tokens per call), useful for ad-hoc reasoning support.

## Token Impact

- Setup usage: One-time, not counted against daily budget
- Runtime usage: +1K-3K tokens/day (on-demand only)
