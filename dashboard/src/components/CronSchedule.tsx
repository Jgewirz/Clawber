"use client";

import { usePolling } from "@/hooks/usePolling";
import { AGENTS } from "@/config/agents";
import type { CronJob } from "@/lib/types";

const agentDeptMap = new Map(AGENTS.map((a) => [a.codename, a.department]));

const deptBgColors: Record<string, string> = {
  exec: "bg-[var(--color-dept-exec)]",
  sales: "bg-[var(--color-dept-sales)]",
  marketing: "bg-[var(--color-dept-marketing)]",
  ops: "bg-[var(--color-dept-ops)]",
  strategy: "bg-[var(--color-dept-strategy)]",
};

const statusColors: Record<string, string> = {
  success: "text-[var(--color-status-ok)]",
  fail: "text-[var(--color-status-error)]",
  unknown: "text-[var(--color-text-tertiary)]",
};

function formatNext(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  if (diffMs < 0) return "overdue";
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 60) return `in ${diffMin}m`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `in ${diffH}h ${diffMin % 60}m`;
  return d.toLocaleDateString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" });
}

function getHourPosition(iso: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  return d.getHours() + d.getMinutes() / 60;
}

export function CronSchedule() {
  const { data: jobs, loading } = usePolling<CronJob[]>({
    url: "/api/cron",
    intervalMs: 300_000,
    initialData: [],
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const nowHour = new Date().getHours() + new Date().getMinutes() / 60;

  return (
    <section className="rounded-lg bg-[var(--color-bg-surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Cron Schedule (24h)
      </h2>

      {/* Timeline */}
      <div className="relative mb-4">
        <div className="flex">
          {hours.map((h) => (
            <div key={h} className="flex-1 text-center">
              <span className="text-[10px] text-[var(--color-text-tertiary)]">
                {h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-3 bg-[var(--color-bg-subtle)] rounded-full mt-1">
          {/* Now indicator */}
          <div
            className="absolute top-0 w-0.5 h-full bg-[var(--color-status-error)] z-10"
            style={{ left: `${(nowHour / 24) * 100}%` }}
          />
          {/* Job markers */}
          {jobs.map((job) => {
            const pos = getHourPosition(job.nextRun);
            if (pos === null) return null;
            const dept = agentDeptMap.get(job.agent) || "ops";
            return (
              <div
                key={job.name}
                className={`absolute top-0.5 w-2 h-2 rounded-full ${deptBgColors[dept]}`}
                style={{ left: `${(pos / 24) * 100}%` }}
                title={`${job.name}: ${formatNext(job.nextRun)}`}
              />
            );
          })}
        </div>
      </div>

      {/* Job list */}
      {loading && jobs.length === 0 ? (
        <div className="text-[var(--color-text-tertiary)] text-sm">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {jobs.map((job) => {
            const dept = agentDeptMap.get(job.agent) || "ops";
            return (
              <div
                key={job.name}
                className="flex items-center gap-2 text-xs py-1.5 px-2 rounded bg-[var(--color-bg-subtle)]"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${deptBgColors[dept]}`} />
                <span className="font-medium text-[var(--color-text-primary)] flex-1 truncate">
                  {job.agent}
                </span>
                <span className={statusColors[job.lastStatus] || ""}>
                  {job.lastStatus === "success" ? "\u2713" : job.lastStatus === "fail" ? "\u2717" : "\u2022"}
                </span>
                <span className="text-[var(--color-text-tertiary)] w-16 text-right">
                  {formatNext(job.nextRun)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
