# OUTPUT 5 — BROWSER AUTOMATION STRUCTURE

## Browser Tools — Two Layers

Agents have access to two browser automation tools:

1. **PinchTab** (primary) — Token-efficient HTTP API for text extraction and navigation. ~800 tokens/page vs ~5,000+ for screenshots. **5-13x token savings.**
2. **Playwright Core** (fallback) — OpenClaw's built-in full browser for complex interactions, screenshots, and form submissions.

**Decision rule:** Use PinchTab for reading/extracting web content. Use Playwright for interactions requiring visual context (screenshots, CAPTCHAs, complex forms).

---

## Architecture

```
[Agent (e.g., SCOUT)]
       |
       +--- PinchTab (primary) -------> HTTP API (port 9867)
       |    ~800 tokens/page                  |
       |    text extraction, navigation       v
       |                                [Headless Chrome in Docker]
       |
       +--- Playwright (fallback) ----> OpenClaw Gateway
            ~5,000+ tokens/page              |
            screenshots, forms               v
                                        [Chromium Browser Instance]
```

### PinchTab Setup

PinchTab runs as a Docker container via the master `docker-compose.yml`:

```bash
docker compose up pinchtab -d
curl http://localhost:9867/health
```

OpenClaw plugin config:
```json
{
  "plugins": {
    "entries": {
      "pinchtab": {
        "enabled": true,
        "config": {
          "baseUrl": "http://localhost:9867",
          "token": "${PINCHTAB_TOKEN}",
          "timeout": 30000
        }
      }
    }
  }
}
```

See `integrations/pinchtab/README.md` for full setup details.

### Token Savings Estimate

| Scenario | Playwright | PinchTab | Savings |
|----------|-----------|----------|---------|
| Extract pricing page | ~5,000 tokens | ~800 tokens | 84% |
| Read competitor blog | ~8,000 tokens | ~1,200 tokens | 85% |
| SERP analysis (10 results) | ~12,000 tokens | ~2,000 tokens | 83% |
| **Daily total (all agents)** | **~60,000 tokens** | **~20,000 tokens** | **~40,000 saved** |

---

## Browser Tool Usage (Per Agent)

### SCOUT — Lead Research

```yaml
browser_tasks:
  - name: scrape_competitor_pricing
    description: Navigate to competitor websites, extract pricing tiers
    steps:
      - navigate: "https://competitor.com/pricing"
      - extract: ".pricing-card"
      - store: notion_competitive_analysis

  - name: linkedin_company_research
    description: Research company info on LinkedIn
    steps:
      - navigate: "https://linkedin.com/company/{slug}"
      - extract: ".org-top-card"
      - store: lead_enrichment_data

  - name: google_maps_scrape
    description: Find local businesses by category
    tool: apify  # Use Apify actor for Google Maps (more reliable)
    actor: "apify/google-maps-scraper"
    input:
      searchTerms: ["AI consulting agencies {city}"]
      maxResults: 50
```

### ORACLE — Competitive Intelligence

```yaml
browser_tasks:
  - name: monitor_competitor_changes
    description: Check competitor homepage for changes
    steps:
      - navigate: "https://competitor.com"
      - screenshot: full_page
      - compare: previous_screenshot
      - report_changes: true

  - name: product_hunt_monitoring
    description: Check Product Hunt for new AI sales tools
    steps:
      - navigate: "https://producthunt.com/topics/sales"
      - extract: ".post-card" (top 10)
      - store: research_log

  - name: g2_review_scrape
    description: Monitor competitor G2 reviews
    tool: apify
    actor: "apify/g2-review-scraper"
    input:
      url: "https://g2.com/products/{competitor}/reviews"
      maxReviews: 20
```

### HERALD — Social Media Research

```yaml
browser_tasks:
  - name: trending_topics_research
    description: Check trending topics for content inspiration
    steps:
      - navigate: "https://twitter.com/explore/tabs/trending"
      - extract: trending_topics
      - filter: ai_sales_marketing_related
      - store: content_ideas
```

---

## Apify Integration (Heavy Scraping)

For large-scale scraping, agents delegate to **Apify actors** instead of direct browser control. This is more reliable and avoids rate limiting.

### Available Apify Actors

| Actor | Agent | Purpose |
|-------|-------|---------|
| `apify/google-maps-scraper` | SCOUT | Find local businesses |
| `apify/google-search-scraper` | RANKER | SERP analysis |
| `apify/instagram-scraper` | HERALD | Competitor social analysis |
| `apify/linkedin-company-scraper` | SCOUT | Company enrichment |
| `apify/website-content-crawler` | ORACLE | Full site content extraction |

### Apify Usage Pattern

```bash
# SCOUT uses Apify for Google Maps lead scraping
curl -X POST "https://api.apify.com/v2/acts/apify~google-maps-scraper/runs" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "searchTerms": ["marketing agencies in Austin TX"],
    "maxResults": 50,
    "language": "en",
    "includeWebResults": true
  }'
```

---

## Browser Safety Rules

1. **Rate limiting:** Max 30 browser actions per hour per agent
2. **LinkedIn:** Never auto-connect or auto-message. Research only.
3. **No CAPTCHAs:** If a CAPTCHA appears, skip and log for human review
4. **Respectful scraping:** Honor robots.txt, add delays between requests
5. **Credential storage:** Browser login credentials stored in `~/.openclaw/credentials/` (encrypted)
6. **Human-gated:** Any browser action that submits data (forms, messages) requires Telegram approval

---

## Budget Controls

| Agent | PinchTab Actions/Day | Playwright Actions/Day | Apify Runs/Day | Notes |
|-------|---------------------|----------------------|----------------|-------|
| SCOUT | 40 | 10 | 10 | PinchTab for text, Playwright for forms |
| ORACLE | 25 | 5 | 5 | PinchTab for monitoring |
| RANKER | 15 | 5 | 5 | PinchTab for SERP text |
| SENDER | 5 | 0 | 0 | PinchTab for Instantly dashboard |
| HERALD | 5 | 5 | 2 | Playwright for social screenshots |
| Others | 0 | 0 | 0 | No browser access |
