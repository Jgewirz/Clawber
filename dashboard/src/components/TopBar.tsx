"use client";

import { usePolling } from "@/hooks/usePolling";
import { StatusDot } from "./StatusDot";
import type { ServiceHealth } from "@/lib/types";

export function TopBar() {
  const { data: services } = usePolling<ServiceHealth[]>({
    url: "/api/health",
    intervalMs: 30_000,
    initialData: [
      { name: "OpenClaw", status: "unknown", latencyMs: null, url: "" },
      { name: "Paperclip", status: "unknown", latencyMs: null, url: "" },
      { name: "PinchTab", status: "unknown", latencyMs: null, url: "" },
      { name: "AO", status: "unknown", latencyMs: null, url: "" },
    ],
  });

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold tracking-tight">OptAImum Command Center</h1>
      </div>
      <div className="flex items-center gap-5">
        {services.map((svc) => (
          <div key={svc.name} className="flex items-center gap-2 text-sm">
            <StatusDot status={svc.status} size="md" />
            <span className="text-[var(--color-text-secondary)]">{svc.name}</span>
            {svc.latencyMs !== null && (
              <span className="text-[var(--color-text-tertiary)] text-xs">
                {svc.latencyMs}ms
              </span>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
