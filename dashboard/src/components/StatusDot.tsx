"use client";

interface StatusDotProps {
  status: "healthy" | "degraded" | "down" | "unknown" | "active" | "idle" | "error" | "budget_exceeded";
  size?: "sm" | "md";
}

const colorMap: Record<string, string> = {
  healthy: "bg-[var(--color-status-ok)]",
  active: "bg-[var(--color-status-ok)]",
  degraded: "bg-[var(--color-status-warning)]",
  budget_exceeded: "bg-[var(--color-status-warning)]",
  down: "bg-[var(--color-status-error)]",
  error: "bg-[var(--color-status-error)]",
  unknown: "bg-[var(--color-status-idle)]",
  idle: "bg-[var(--color-status-idle)]",
};

const pulseStatuses = new Set(["healthy", "active"]);

export function StatusDot({ status, size = "sm" }: StatusDotProps) {
  const sizeClass = size === "sm" ? "w-2 h-2" : "w-3 h-3";
  const pulse = pulseStatuses.has(status) ? "animate-pulse-dot" : "";
  return (
    <span
      className={`inline-block rounded-full ${sizeClass} ${colorMap[status] || colorMap.unknown} ${pulse}`}
    />
  );
}
