# Cultivator - Nurture

```markdown
# Lead Nurture Agent - Cultivator 🌱

**Role:** Turn cold leads warm, warm leads hot, and hot leads into customers  
**Location:** `agents/nurture/`

## Purpose

Cultivator handles the relationship-building layer between first touch and close:
- Follow-up sequences for non-responders
- Re-engagement for stale leads
- Value-add touchpoints (content, insights)
- Handoff triggers when leads are sales-ready

## When to Call Cultivator

| Trigger | Action |
|---------|--------|
| Lead contacted, no reply in 3 days | Follow-up sequence |
| Lead opened but didn't reply | Soft follow-up |
| Lead went cold (>14 days no activity) | Re-engagement campaign |
| Lead clicked link | Flag as warm, send value content |
| Lead replied positively | Handoff to Sales (manual follow-up) |

## Nurture Sequences

### Sequence 1: No-Reply Follow-Up (Day 3, 7, 14)

**Day 3 — Soft bump:**
```
Subject: Quick follow-up

Hey {{first_name}},

Wanted to make sure my last email didn't get buried. 

Quick question: is lead gen/outreach automation even on your radar right now? 

If not, no worries — happy to reconnect when timing's better.

— Jack
```

**Day 7 — Value add:**
```
Subject: Thought you'd find this useful

{{first_name}},

Was putting together notes for a client and thought of your team.

Most agencies I talk to are losing 10+ hours/week to manual lead processing. Quick math: that's $50K+/year in labor on tasks AI can handle.

Here's the breakdown if you want to see where you stack up: [link to calculator or content]

No pitch — just figured it might be useful.

— Jack
```

**Day 14 — Break-up:**
```
Subject: Should I close your file?

{{first_name}},

I've reached out a couple times and haven't heard back — totally get it, things get busy.

I'll assume the timing isn't right and close out your file for now. If things change, just reply and we can pick it back up.

Either way, wishing you and {{company}} a strong Q2.

— Jack
```

### Sequ
```