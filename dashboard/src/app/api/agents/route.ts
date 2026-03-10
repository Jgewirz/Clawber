import { NextResponse } from "next/server";
import {
  getServiceUrls,
  PAPERCLIP_COMPANY_ID,
  getCached,
  setCache,
  getPgConfig,
} from "@/lib/constants";
import { AGENTS } from "@/config/agents";
import type { AgentStatus } from "@/lib/types";

const CACHE_KEY = "agents";

export async function GET() {
  const cached = getCached<AgentStatus[]>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const urls = getServiceUrls();
  const pgConfig = getPgConfig();

  // Try to get live agent data from Paperclip
  let paperclipAgents: Record<string, { status: string; lastActive: string }> =
    {};
  try {
    const res = await fetch(
      `${urls.paperclip}/api/companies/${PAPERCLIP_COMPANY_ID}/agents`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const a of data) {
          paperclipAgents[a.codename || a.name] = {
            status: a.status || "idle",
            lastActive: a.lastActiveAt || a.updatedAt || null,
          };
        }
      }
    }
  } catch {
    // Paperclip unavailable — use defaults
  }

  // Try to get today's token usage from PG
  let tokenUsage: Record<string, number> = {};
  if (pgConfig.password) {
    try {
      const { Pool } = await import("pg");
      const pool = new Pool({
        host: pgConfig.host,
        database: pgConfig.database,
        user: pgConfig.user,
        password: pgConfig.password,
        ssl: pgConfig.ssl || undefined,
        max: 2,
        connectionTimeoutMillis: 5000,
      });
      const result = await pool.query(
        `SELECT agent, COALESCE(SUM(tokens_used), 0)::int as total
         FROM agent_token_usage
         WHERE date = CURRENT_DATE
         GROUP BY agent`,
      );
      for (const row of result.rows) {
        tokenUsage[row.agent] = row.total;
      }
      await pool.end();
    } catch {
      // PG unavailable or table doesn't exist
    }
  }

  const statuses: AgentStatus[] = AGENTS.map((agent) => {
    const live = paperclipAgents[agent.codename];
    const tokens = tokenUsage[agent.codename] || 0;

    let status: AgentStatus["status"] = "idle";
    if (live) {
      if (live.status === "working" || live.status === "active")
        status = "active";
      else if (live.status === "error") status = "error";
    }
    if (tokens > agent.dailyTokenLimit) status = "budget_exceeded";

    return {
      codename: agent.codename,
      status,
      tokensUsedToday: tokens,
      lastActiveAt: live?.lastActive || null,
      currentTask: null,
    };
  });

  setCache(CACHE_KEY, statuses, 30_000);
  return NextResponse.json(statuses);
}
