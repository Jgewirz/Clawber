# OUTPUT 5 — BROWSER AUTOMATION STRUCTURE

## OpenClaw Browser Integration

OpenClaw ships with **Playwright Core** built-in (`playwright-core` in package.json). Agents access browser automation through OpenClaw's native `browser` tool — no external PinchTab needed.

---

## Architecture

```
[Agent (e.g., SCOUT)]
       |
       | uses OpenClaw browser tool
       v
[OpenClaw Gateway]
       |
       | Playwright Core
       v
[Chromium Browser Instance]
       |
       +---> Scrape competitor websites
       +---> Fill forms (lead capture)
       +---> Navigate SaaS platforms
       +---> Extract data from pages
```

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

| Agent | Browser Actions/Day | Apify Runs/Day | Notes |
|-------|-------------------|----------------|-------|
| SCOUT | 50 | 10 | Heavy research |
| ORACLE | 30 | 5 | Competitive monitoring |
| RANKER | 20 | 5 | SERP analysis |
| HERALD | 10 | 2 | Social research |
| Others | 0 | 0 | No browser access |
