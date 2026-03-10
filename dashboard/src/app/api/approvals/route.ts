import { NextResponse } from "next/server";
import { getNotionConfig, getCached, setCache } from "@/lib/constants";
import type { ApprovalItem } from "@/lib/types";

const CACHE_KEY = "approvals";

interface NotionPage {
  id: string;
  created_time: string;
  properties: Record<string, unknown>;
}

async function queryNotionPages(
  apiKey: string,
  dbId: string,
  filter: Record<string, unknown>,
): Promise<NotionPage[]> {
  if (!apiKey || !dbId) return [];
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filter, page_size: 20 }),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

function getTitle(page: NotionPage): string {
  const props = page.properties;
  for (const val of Object.values(props)) {
    const v = val as Record<string, unknown>;
    if (v.type === "title" && Array.isArray(v.title) && v.title.length > 0) {
      return (v.title[0] as { plain_text?: string }).plain_text || "Untitled";
    }
  }
  return "Untitled";
}

export async function GET() {
  const cached = getCached<ApprovalItem[]>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const notion = getNotionConfig();

  if (!notion.apiKey) {
    return NextResponse.json([]);
  }

  const [outreachDrafts, contentReview, socialDrafts, tasksPending] =
    await Promise.all([
      queryNotionPages(notion.apiKey, notion.dbOutreach, {
        property: "Status",
        status: { equals: "Draft" },
      }),
      queryNotionPages(notion.apiKey, notion.dbContentCalendar, {
        property: "Status",
        status: { equals: "Review" },
      }),
      queryNotionPages(notion.apiKey, notion.dbSocialContent, {
        property: "Status",
        status: { equals: "Draft" },
      }),
      queryNotionPages(notion.apiKey, notion.dbTasks, {
        property: "Status",
        status: { equals: "Pending Approval" },
      }),
    ]);

  const items: ApprovalItem[] = [
    ...outreachDrafts.map(
      (p): ApprovalItem => ({
        id: p.id,
        type: "email",
        title: getTitle(p),
        sourceAgent: "SENDER",
        createdAt: p.created_time,
        status: "draft",
      }),
    ),
    ...contentReview.map(
      (p): ApprovalItem => ({
        id: p.id,
        type: "content",
        title: getTitle(p),
        sourceAgent: "SCRIBE",
        createdAt: p.created_time,
        status: "review",
      }),
    ),
    ...socialDrafts.map(
      (p): ApprovalItem => ({
        id: p.id,
        type: "social",
        title: getTitle(p),
        sourceAgent: "HERALD",
        createdAt: p.created_time,
        status: "draft",
      }),
    ),
    ...tasksPending.map(
      (p): ApprovalItem => ({
        id: p.id,
        type: "experiment",
        title: getTitle(p),
        sourceAgent: "AMPLIFY",
        createdAt: p.created_time,
        status: "pending_approval",
      }),
    ),
  ];

  // Sort newest first
  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  setCache(CACHE_KEY, items, 300_000);
  return NextResponse.json(items);
}
