export interface ServiceHealth {
  name: string;
  status: "healthy" | "degraded" | "down" | "unknown";
  latencyMs: number | null;
  url: string;
}

export interface AgentStatus {
  codename: string;
  status: "active" | "idle" | "error" | "budget_exceeded";
  tokensUsedToday: number;
  lastActiveAt: string | null;
  currentTask: string | null;
}

export interface PipelineStage {
  name: string;
  count: number;
  conversionPct: number | null;
}

export interface BudgetData {
  dailyTokensUsed: number;
  dailyTokensLimit: number;
  perAgent: { codename: string; used: number; limit: number }[];
  monthlyCostCents: number;
  monthlyBudgetCents: number;
}

export interface ApprovalItem {
  id: string;
  type: "email" | "content" | "social" | "experiment";
  title: string;
  sourceAgent: string;
  createdAt: string;
  status: "draft" | "review" | "pending_approval";
}

export interface CronJob {
  name: string;
  agent: string;
  expression: string;
  lastRun: string | null;
  nextRun: string | null;
  lastStatus: "success" | "fail" | "unknown";
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  status: "success" | "error" | "info";
}
