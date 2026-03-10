"use client";

import { usePolling } from "@/hooks/usePolling";
import { relativeTime } from "@/lib/format";
import type { ApprovalItem } from "@/lib/types";

const typeIcons: Record<string, string> = {
  email: "\u2709",
  content: "\u270E",
  social: "\u{1F4E2}",
  experiment: "\u2697",
};

const statusColors: Record<string, string> = {
  draft: "text-[var(--color-status-warning)]",
  review: "text-[var(--color-status-info)]",
  pending_approval: "text-[var(--color-status-attention)]",
};

export function ApprovalQueue() {
  const { data: items, loading } = usePolling<ApprovalItem[]>({
    url: "/api/approvals",
    intervalMs: 300_000,
    initialData: [],
  });

  return (
    <section className="rounded-lg bg-[var(--color-bg-surface)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Approvals
        </h2>
        {items.length > 0 && (
          <span className="text-xs bg-[var(--color-status-warning)] text-black px-2 py-0.5 rounded-full font-bold">
            {items.length}
          </span>
        )}
      </div>

      {loading && items.length === 0 ? (
        <div className="text-[var(--color-text-tertiary)] text-sm">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-[var(--color-text-tertiary)] text-sm py-4 text-center">
          No pending approvals
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-2 px-3 rounded bg-[var(--color-bg-subtle)] text-sm"
            >
              <span className="text-base" title={item.type}>
                {typeIcons[item.type] || "?"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="truncate text-[var(--color-text-primary)]">{item.title}</div>
                <div className="text-xs text-[var(--color-text-tertiary)]">
                  {item.sourceAgent} &middot; {relativeTime(item.createdAt)}
                </div>
              </div>
              <span className={`text-xs font-medium ${statusColors[item.status] || ""}`}>
                {item.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
