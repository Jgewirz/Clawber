"use client";

import { usePolling } from "@/hooks/usePolling";
import type { PipelineStage } from "@/lib/types";

export function SalesPipeline() {
  const { data: stages, loading } = usePolling<PipelineStage[]>({
    url: "/api/pipeline",
    intervalMs: 300_000,
    initialData: [],
  });

  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <section className="rounded-lg bg-[var(--color-bg-surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Sales Pipeline
      </h2>
      {loading && stages.length === 0 ? (
        <div className="text-[var(--color-text-tertiary)] text-sm">Loading...</div>
      ) : (
        <div className="flex items-end gap-2 h-32">
          {stages.map((stage, i) => {
            const heightPct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
            return (
              <div key={stage.name} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[var(--color-text-primary)]">
                  {stage.count}
                </span>
                {stage.conversionPct !== null && (
                  <span className="text-[10px] text-[var(--color-status-info)]">
                    {stage.conversionPct}%
                  </span>
                )}
                <div className="w-full flex items-end" style={{ height: "80px" }}>
                  <div
                    className="w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${Math.max(heightPct, 4)}%`,
                      background: `linear-gradient(to top, var(--color-status-info), rgba(88, 166, 255, 0.4))`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[var(--color-text-tertiary)] text-center leading-tight">
                  {stage.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
