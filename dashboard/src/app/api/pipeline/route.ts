import { NextResponse } from "next/server";
import { getNotionConfig, getCached, setCache } from "@/lib/constants";
import type { PipelineStage } from "@/lib/types";

const CACHE_KEY = "pipeline";

async function queryNotionCount(
  apiKey: string,
  dbId: string,
  filter?: Record<string, unknown>,
): Promise<number> {
  if (!apiKey || !dbId) return 0;
  try {
    const body: Record<string, unknown> = { page_size: 1 };
    if (filter) body.filter = filter;
    const res = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return 0;
    const data = await res.json();
    // Notion returns has_more for pagination; use results length or total if available
    return data.results?.length ?? 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const cached = getCached<PipelineStage[]>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const notion = getNotionConfig();

  // If Notion isn't configured, return placeholder data
  if (!notion.apiKey) {
    const placeholder: PipelineStage[] = [
      { name: "Leads Found", count: 0, conversionPct: null },
      { name: "Emails Sent", count: 0, conversionPct: null },
      { name: "Replies", count: 0, conversionPct: null },
      { name: "Qualified", count: 0, conversionPct: null },
      { name: "Calls Booked", count: 0, conversionPct: null },
      { name: "Closed Won", count: 0, conversionPct: null },
    ];
    return NextResponse.json(placeholder);
  }

  const [leads, sent, replies, qualified, calls, closed] = await Promise.all([
    queryNotionCount(notion.apiKey, notion.dbLeads),
    queryNotionCount(notion.apiKey, notion.dbOutreach, {
      property: "Status",
      status: { equals: "Sent" },
    }),
    queryNotionCount(notion.apiKey, notion.dbOutreach, {
      property: "Status",
      status: { equals: "Replied" },
    }),
    queryNotionCount(notion.apiKey, notion.dbLeads, {
      property: "Status",
      status: { equals: "Qualified" },
    }),
    queryNotionCount(notion.apiKey, notion.dbLeads, {
      property: "Status",
      status: { equals: "Call Booked" },
    }),
    queryNotionCount(notion.apiKey, notion.dbRevenue),
  ]);

  const stages: PipelineStage[] = [
    { name: "Leads Found", count: leads, conversionPct: null },
    {
      name: "Emails Sent",
      count: sent,
      conversionPct: leads > 0 ? Math.round((sent / leads) * 100) : null,
    },
    {
      name: "Replies",
      count: replies,
      conversionPct: sent > 0 ? Math.round((replies / sent) * 100) : null,
    },
    {
      name: "Qualified",
      count: qualified,
      conversionPct:
        replies > 0 ? Math.round((qualified / replies) * 100) : null,
    },
    {
      name: "Calls Booked",
      count: calls,
      conversionPct:
        qualified > 0 ? Math.round((calls / qualified) * 100) : null,
    },
    {
      name: "Closed Won",
      count: closed,
      conversionPct: calls > 0 ? Math.round((closed / calls) * 100) : null,
    },
  ];

  setCache(CACHE_KEY, stages, 300_000);
  return NextResponse.json(stages);
}
