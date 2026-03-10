export type Department = "exec" | "sales" | "marketing" | "ops" | "strategy";

export interface AgentDef {
  codename: string;
  role: string;
  department: Department;
  parentAgent: string | null;
  dailyTokenLimit: number;
  monthlyCents: number;
  cron: string | null; // cron expression or null for on-demand
  cronLabel: string;
  requiresApproval: boolean;
}

export const AGENTS: AgentDef[] = [
  {
    codename: "CLAW",
    role: "CEO — Daily Briefing",
    department: "exec",
    parentAgent: null,
    dailyTokenLimit: 50_000,
    monthlyCents: 4500,
    cron: "0 7 * * *",
    cronLabel: "Daily 7AM briefing",
    requiresApproval: false,
  },
  {
    codename: "FORGE",
    role: "CTO — Technical Oversight",
    department: "ops",
    parentAgent: "CLAW",
    dailyTokenLimit: 30_000,
    monthlyCents: 2700,
    cron: "0 8 * * 1",
    cronLabel: "Weekly Monday review",
    requiresApproval: false,
  },
  {
    codename: "AMPLIFY",
    role: "CMO — Marketing Strategy",
    department: "marketing",
    parentAgent: "CLAW",
    dailyTokenLimit: 40_000,
    monthlyCents: 3600,
    cron: "0 8 * * *",
    cronLabel: "Daily 8AM strategy",
    requiresApproval: false,
  },
  {
    codename: "SCOUT",
    role: "Lead Intelligence",
    department: "sales",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 20_000,
    monthlyCents: 1800,
    cron: "*/30 * * * *",
    cronLabel: "Every 30 minutes",
    requiresApproval: false,
  },
  {
    codename: "SENDER",
    role: "Cold Outreach",
    department: "sales",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 15_000,
    monthlyCents: 1350,
    cron: "0 9,17 * * 1-5",
    cronLabel: "9AM & 5PM weekdays",
    requiresApproval: true,
  },
  {
    codename: "NEXUS",
    role: "CRM & Data Sync",
    department: "ops",
    parentAgent: "FORGE",
    dailyTokenLimit: 25_000,
    monthlyCents: 2250,
    cron: "0 * * * *",
    cronLabel: "Hourly",
    requiresApproval: false,
  },
  {
    codename: "CULTIVATOR",
    role: "Lead Nurture",
    department: "sales",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 15_000,
    monthlyCents: 1350,
    cron: "0 10 * * 1-5",
    cronLabel: "10AM weekdays",
    requiresApproval: true,
  },
  {
    codename: "CONNECTOR",
    role: "Warm Outreach",
    department: "sales",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 10_000,
    monthlyCents: 900,
    cron: null,
    cronLabel: "On-demand",
    requiresApproval: false,
  },
  {
    codename: "RANKER",
    role: "SEO Optimization",
    department: "marketing",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 15_000,
    monthlyCents: 1350,
    cron: "0 9 * * 3",
    cronLabel: "Wednesday 9AM",
    requiresApproval: false,
  },
  {
    codename: "SCRIBE",
    role: "Content Creation",
    department: "marketing",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 20_000,
    monthlyCents: 1800,
    cron: "0 9 * * 1,4",
    cronLabel: "Mon & Thu 9AM",
    requiresApproval: true,
  },
  {
    codename: "HERALD",
    role: "Social Media",
    department: "marketing",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 10_000,
    monthlyCents: 900,
    cron: "0 10 * * 2,4",
    cronLabel: "Tue & Thu 10AM",
    requiresApproval: true,
  },
  {
    codename: "ORACLE",
    role: "Competitive Research",
    department: "strategy",
    parentAgent: "AMPLIFY",
    dailyTokenLimit: 15_000,
    monthlyCents: 1350,
    cron: "0 8 * * 1,4",
    cronLabel: "Mon & Thu 8AM",
    requiresApproval: false,
  },
  {
    codename: "SENTINEL",
    role: "Ops Monitor",
    department: "ops",
    parentAgent: "FORGE",
    dailyTokenLimit: 10_000,
    monthlyCents: 900,
    cron: "0 */6 * * *",
    cronLabel: "Every 6 hours",
    requiresApproval: false,
  },
  {
    codename: "COMPASS",
    role: "Product Roadmap",
    department: "strategy",
    parentAgent: "FORGE",
    dailyTokenLimit: 10_000,
    monthlyCents: 900,
    cron: "0 9 * * 1",
    cronLabel: "Monday 9AM",
    requiresApproval: false,
  },
];

export const TOTAL_DAILY_TOKENS = 500_000;
export const MONTHLY_BUDGET_CENTS = 26_200; // $262

export const DEPT_COLORS: Record<Department, string> = {
  exec: "var(--color-dept-exec)",
  sales: "var(--color-dept-sales)",
  marketing: "var(--color-dept-marketing)",
  ops: "var(--color-dept-ops)",
  strategy: "var(--color-dept-strategy)",
};
