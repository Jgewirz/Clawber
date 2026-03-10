"use client";

import { StatusDot } from "./StatusDot";
import { ProgressBar } from "./ProgressBar";
import { relativeTime, formatTokens } from "@/lib/format";
import type { AgentDef } from "@/config/agents";
import type { AgentStatus } from "@/lib/types";

interface AgentCardProps {
  agent: AgentDef;
  status: AgentStatus | null;
}

const deptBorderColors: Record<string, string> = {
  exec: "border-l-[var(--color-dept-exec)]",
  sales: "border-l-[var(--color-dept-sales)]",
  marketing: "border-l-[var(--color-dept-marketing)]",
  ops: "border-l-[var(--color-dept-ops)]",
  strategy: "border-l-[var(--color-dept-strategy)]",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  idle: "Idle",
  error: "Error",
  budget_exceeded: "Over Budget",
};

export function AgentCard({ agent, status }: AgentCardProps) {
  const s = status?.status || "idle";
  const tokensUsed = status?.tokensUsedToday || 0;

  return (
    <div
      className={`rounded-lg bg-[var(--color-bg-surface)] border-l-3 p-4 flex flex-col gap-2 transition-all duration-200 hover:bg-[var(--color-bg-elevated)]`}
      style={{ borderLeftColor: `var(--color-dept-${agent.department})` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusDot status={s} size="md" />
          <span className="font-bold text-sm">{agent.codename}</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
          {statusLabels[s] || s}
        </span>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] leading-tight">
        {agent.role}
      </p>

      <ProgressBar
        value={tokensUsed}
        max={agent.dailyTokenLimit}
        label="Tokens"
        sublabel={`${formatTokens(tokensUsed)} / ${formatTokens(agent.dailyTokenLimit)}`}
      />

      <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] mt-1">
        <span>Last: {relativeTime(status?.lastActiveAt || null)}</span>
        <span>{agent.cronLabel}</span>
      </div>
    </div>
  );
}
