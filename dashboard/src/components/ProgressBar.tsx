"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  sublabel?: string;
  height?: "sm" | "md";
}

function getBarColor(pct: number): string {
  if (pct >= 90) return "bg-[var(--color-status-error)]";
  if (pct >= 70) return "bg-[var(--color-status-warning)]";
  return "bg-[var(--color-status-ok)]";
}

export function ProgressBar({ value, max, label, sublabel, height = "sm" }: ProgressBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const h = height === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {(label || sublabel) && (
        <div className="flex justify-between text-xs mb-1">
          {label && <span className="text-[var(--color-text-secondary)]">{label}</span>}
          {sublabel && <span className="text-[var(--color-text-tertiary)]">{sublabel}</span>}
        </div>
      )}
      <div className={`w-full ${h} rounded-full bg-[var(--color-bg-subtle)]`}>
        <div
          className={`${h} rounded-full transition-all duration-500 ${getBarColor(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
