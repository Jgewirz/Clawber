"use client";

import { usePolling } from "@/hooks/usePolling";
import { ProgressBar } from "./ProgressBar";
import { formatTokens, formatCents } from "@/lib/format";
import { AGENTS, TOTAL_DAILY_TOKENS, MONTHLY_BUDGET_CENTS } from "@/config/agents";
import type { BudgetData } from "@/lib/types";

const defaultBudget: BudgetData = {
  dailyTokensUsed: 0,
  dailyTokensLimit: TOTAL_DAILY_TOKENS,
  perAgent: AGENTS.map((a) => ({ codename: a.codename, used: 0, limit: a.dailyTokenLimit })),
  monthlyCostCents: 0,
  monthlyBudgetCents: MONTHLY_BUDGET_CENTS,
};

export function BudgetMonitor() {
  const { data: budget } = usePolling<BudgetData>({
    url: "/api/budget",
    intervalMs: 60_000,
    initialData: defaultBudget,
  });

  return (
    <section className="rounded-lg bg-[var(--color-bg-surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Budget
      </h2>

      {/* Daily total */}
      <div className="mb-4">
        <ProgressBar
          value={budget.dailyTokensUsed}
          max={budget.dailyTokensLimit}
          label="Daily Tokens"
          sublabel={`${formatTokens(budget.dailyTokensUsed)} / ${formatTokens(budget.dailyTokensLimit)}`}
          height="md"
        />
      </div>

      {/* Per-agent bars */}
      <div className="space-y-1.5 mb-4 max-h-48 overflow-y-auto">
        {budget.perAgent.map((a) => (
          <div key={a.codename} className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-tertiary)] w-20 shrink-0">
              {a.codename}
            </span>
            <div className="flex-1">
              <ProgressBar value={a.used} max={a.limit} />
            </div>
            <span className="text-[10px] text-[var(--color-text-tertiary)] w-16 text-right">
              {formatTokens(a.used)}/{formatTokens(a.limit)}
            </span>
          </div>
        ))}
      </div>

      {/* Monthly cost */}
      <ProgressBar
        value={budget.monthlyCostCents}
        max={budget.monthlyBudgetCents}
        label="Monthly Cost"
        sublabel={`${formatCents(budget.monthlyCostCents)} / ${formatCents(budget.monthlyBudgetCents)}`}
        height="md"
      />
    </section>
  );
}
