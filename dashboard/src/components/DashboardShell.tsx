"use client";

import { TopBar } from "./TopBar";
import { AgentGrid } from "./AgentGrid";
import { SalesPipeline } from "./SalesPipeline";
import { BudgetMonitor } from "./BudgetMonitor";
import { CronSchedule } from "./CronSchedule";
import { ApprovalQueue } from "./ApprovalQueue";
import { ActivityFeed } from "./ActivityFeed";

export function DashboardShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Agent Grid — full width */}
        <AgentGrid />

        {/* Pipeline + Budget — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesPipeline />
          <BudgetMonitor />
        </div>

        {/* Cron Schedule — full width */}
        <CronSchedule />

        {/* Approvals + Activity Feed — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApprovalQueue />
          <ActivityFeed />
        </div>
      </main>
    </div>
  );
}
