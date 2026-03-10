# PM Skills Integration — 65 Product Management Skills

## What It Replaces

The 5 "New Skills to Build" from `06_SKILL_MODULE_SYSTEM.md`:
- `market-research` -> replaced by `pm-market-research` plugin (7 skills)
- `product-strategy` -> replaced by `pm-product-strategy` plugin (12 skills)
- `growth-loop-design` -> replaced by `pm-go-to-market` plugin (6 skills)
- `experimentation-design` -> replaced by `pm-data-analytics` plugin (3 skills)
- `okr-planning` -> replaced by `pm-execution` plugin (15 skills, includes OKR)

**Total: 5 planned custom skills -> 65 proven community skills across 8 plugins**

## Installation

### Option A: Claude Code Plugin Marketplace

```bash
claude plugin marketplace add phuryn/pm-skills
claude plugin install pm-toolkit@pm-skills
claude plugin install pm-execution@pm-skills
claude plugin install pm-product-discovery@pm-skills
claude plugin install pm-product-strategy@pm-skills
claude plugin install pm-market-research@pm-skills
claude plugin install pm-data-analytics@pm-skills
claude plugin install pm-go-to-market@pm-skills
claude plugin install pm-marketing-growth@pm-skills
```

### Option B: Symlink to OpenClaw skills directory

```bash
ln -s ~/Desktop/pm-skills ~/.openclaw/skills/pm-skills
```

### Option C: Configure extraDirs in OpenClaw config

```json
{
  "skills": {
    "load": {
      "extraDirs": ["~/Desktop/pm-skills"]
    }
  }
}
```

## Agent-Skill Mapping

See `agent-skill-mapping.yaml` for the full mapping.

| Agent | PM Skills Plugins |
|-------|------------------|
| COMPASS | pm-product-discovery, pm-product-strategy, pm-execution |
| AMPLIFY | pm-marketing-growth, pm-go-to-market |
| ORACLE | pm-market-research |
| CLAW | pm-product-strategy (strategic decisions only) |

## All 8 Plugins (65 Skills)

| Plugin | # Skills | Focus |
|--------|----------|-------|
| pm-product-discovery | 13 | Ideation, experiments, assumptions, interviews |
| pm-product-strategy | 12 | Vision, business models, pricing, SWOT |
| pm-execution | 15 | PRDs, OKRs, roadmaps, sprints, retros |
| pm-market-research | 7 | Personas, segmentation, journey maps, TAM/SAM |
| pm-data-analytics | 3 | SQL, cohort analysis, A/B testing |
| pm-go-to-market | 6 | GTM strategy, growth loops, battlecards, ICP |
| pm-marketing-growth | 5 | Marketing ideas, positioning, North Star |
| pm-toolkit | 4 | Resume review, NDA, privacy policy, grammar |
