import { NextResponse } from "next/server";
import { getPgConfig, getCached, setCache } from "@/lib/constants";
import { AGENTS, TOTAL_DAILY_TOKENS, MONTHLY_BUDGET_CENTS } from "@/config/agents";
import type { BudgetData } from "@/lib/types";

const CACHE_KEY = "budget";

export async function GET() {
  const cached = getCached<BudgetData>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const pgConfig = getPgConfig();
  let tokenUsage: Record<string, number> = {};
  let monthlyCostCents = 0;

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

      // Today's token usage per agent
      const tokenResult = await pool.query(
        `SELECT agent, COALESCE(SUM(tokens_used), 0)::int as total
         FROM agent_token_usage
         WHERE date = CURRENT_DATE
         GROUP BY agent`,
      );
      for (const row of tokenResult.rows) {
        tokenUsage[row.agent] = row.total;
      }

      // Monthly expenses
      const expenseResult = await pool.query(
        `SELECT COALESCE(SUM(amount_cents), 0)::int as total
         FROM expenses
         WHERE date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE)`,
      );
      monthlyCostCents = expenseResult.rows[0]?.total || 0;

      await pool.end();
    } catch {
      // PG unavailable — use zeros
    }
  }

  const dailyTokensUsed = Object.values(tokenUsage).reduce(
    (sum, v) => sum + v,
    0,
  );

  const budget: BudgetData = {
    dailyTokensUsed,
    dailyTokensLimit: TOTAL_DAILY_TOKENS,
    perAgent: AGENTS.map((a) => ({
      codename: a.codename,
      used: tokenUsage[a.codename] || 0,
      limit: a.dailyTokenLimit,
    })),
    monthlyCostCents,
    monthlyBudgetCents: MONTHLY_BUDGET_CENTS,
  };

  setCache(CACHE_KEY, budget, 30_000);
  return NextResponse.json(budget);
}
