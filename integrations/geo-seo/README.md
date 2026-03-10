# GEO/SEO Skills Integration — 11 AI Search Optimization Skills

## What It Adds

11 specialized GEO (Generative Engine Optimization) and SEO skills for RANKER, plus shared use by SCRIBE and ORACLE. Includes 5 parallel subagents for distributed analysis.

## Installation

### Python Dependencies

```bash
python -m venv ~/.openclaw/geo-venv
source ~/.openclaw/geo-venv/bin/activate  # Linux/Mac
# or: ~/.openclaw/geo-venv/Scripts/activate  # Windows

pip install -r ~/Desktop/geo-seo-claude/requirements.txt
playwright install chromium  # Optional, for screenshots
```

### Copy Skills to OpenClaw

```bash
# Main orchestrator skill
cp -r ~/Desktop/geo-seo-claude/geo ~/.openclaw/skills/

# 11 sub-skills
cp -r ~/Desktop/geo-seo-claude/skills/* ~/.openclaw/skills/

# Python utility scripts
cp -r ~/Desktop/geo-seo-claude/scripts ~/.openclaw/skills/geo-scripts/

# 5 parallel subagents
cp -r ~/Desktop/geo-seo-claude/agents/*.md ~/.openclaw/agents/

# JSON-LD schema templates
cp -r ~/Desktop/geo-seo-claude/schema ~/.openclaw/skills/geo/schema/
```

### Alternative: One-Command Install

```bash
cd ~/Desktop/geo-seo-claude
./install.sh
```

## Agent Assignments

| Agent | GEO Skills | Use Case |
|-------|-----------|----------|
| RANKER (primary) | All 11 skills | Full GEO/SEO audits, SERP analysis |
| SCRIBE | geo-content, geo-citability | Content quality, AI citation optimization |
| ORACLE | geo-brand-mentions, geo-crawlers | Brand monitoring, crawler access analysis |

## All 11 Skills

| Skill | Purpose |
|-------|---------|
| geo-audit | Full audit orchestration & GEO scoring |
| geo-citability | AI citation readiness scoring |
| geo-crawlers | AI crawler access analysis (14+ crawlers) |
| geo-llmstxt | llms.txt standard analysis & generation |
| geo-brand-mentions | Brand presence scanning |
| geo-platform-optimizer | Platform-specific optimization (ChatGPT, Perplexity, AIO) |
| geo-schema | Structured data (JSON-LD) detection & generation |
| geo-technical | Technical SEO audit (Core Web Vitals, mobile, security) |
| geo-content | Content quality & E-E-A-T assessment |
| geo-report | Markdown report generation |
| geo-report-pdf | PDF reports with charts & visualizations |

## Commands

| Command | Function |
|---------|----------|
| `/geo audit <url>` | Full GEO + SEO audit (5 parallel subagents) |
| `/geo quick <url>` | 60-second visibility snapshot |
| `/geo citability <url>` | AI citation readiness score |
| `/geo crawlers <url>` | AI crawler access check |
| `/geo schema <url>` | Structured data analysis |
| `/geo technical <url>` | Technical SEO audit |
| `/geo report-pdf <url>` | PDF report with visualizations |

## Python Dependencies

See `python-deps.txt` for the full requirements.
