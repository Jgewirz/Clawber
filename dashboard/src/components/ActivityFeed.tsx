"use client";

import { useSSE } from "@/hooks/useSSE";
import { AGENTS } from "@/config/agents";
import type { Department } from "@/config/agents";

interface SSEMessage {
  type: string;
  events?: { id: string; timestamp: string; agent: string; action: string; status: string }[];
  sessions?: { id: string; status: string; activity: string; lastActivityAt: string }[];
  timestamp?: string;
}

const deptTextColors: Record<Department, string> = {
  exec: "text-[var(--color-dept-exec)]",
  sales: "text-[var(--color-dept-sales)]",
  marketing: "text-[var(--color-dept-marketing)]",
  ops: "text-[var(--color-dept-ops)]",
  strategy: "text-[var(--color-dept-strategy)]",
};

const agentDeptMap = new Map(AGENTS.map((a) => [a.codename, a.department]));

const statusIcons: Record<string, string> = {
  success: "\u2713",
  error: "\u2717",
  info: "\u2022",
  working: "\u25B6",
  idle: "\u25CB",
  done: "\u2713",
};

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function ActivityFeed() {
  const { events, connected } = useSSE<SSEMessage>({
    url: "/api/events",
    maxEvents: 50,
  });

  return (
    <section className="rounded-lg bg-[var(--color-bg-surface)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Activity Feed
        </h2>
        <span className={`w-2 h-2 rounded-full ${connected ? "bg-[var(--color-status-ok)]" : "bg-[var(--color-status-error)]"}`} />
      </div>

      <div className="space-y-1.5 max-h-64 overflow-y-auto text-xs">
        {events.length === 0 ? (
          <div className="text-[var(--color-text-tertiary)] py-4 text-center text-sm">
            {connected ? "Waiting for events..." : "Connecting..."}
          </div>
        ) : (
          events.map((msg, i) => {
            if (msg.type === "activity" && msg.events) {
              return msg.events.map((evt) => {
                const dept = agentDeptMap.get(evt.agent);
                return (
                  <div key={`${evt.id}-${i}`} className="flex items-start gap-2 py-1">
                    <span className="text-[var(--color-text-tertiary)] w-16 shrink-0">
                      {formatTimestamp(evt.timestamp)}
                    </span>
                    <span className={`font-bold w-20 shrink-0 ${dept ? deptTextColors[dept] : "text-[var(--color-text-secondary)]"}`}>
                      {evt.agent}
                    </span>
                    <span className="text-[var(--color-text-primary)] flex-1">{evt.action}</span>
                    <span>{statusIcons[evt.status] || "\u2022"}</span>
                  </div>
                );
              });
            }
            if (msg.type === "sessions" && msg.sessions) {
              return msg.sessions
                .filter((s) => s.status === "working")
                .map((s) => (
                  <div key={`session-${s.id}-${i}`} className="flex items-start gap-2 py-1">
                    <span className="text-[var(--color-text-tertiary)] w-16 shrink-0">
                      {formatTimestamp(s.lastActivityAt)}
                    </span>
                    <span className="text-[var(--color-status-info)] font-bold w-20 shrink-0">
                      SESSION
                    </span>
                    <span className="text-[var(--color-text-primary)] flex-1">{s.activity}</span>
                    <span>{statusIcons[s.status] || "\u25B6"}</span>
                  </div>
                ));
            }
            if (msg.type === "connected") {
              return (
                <div key={`connected-${i}`} className="flex items-start gap-2 py-1 text-[var(--color-text-tertiary)]">
                  <span className="w-16 shrink-0">{formatTimestamp(msg.timestamp || new Date().toISOString())}</span>
                  <span>Stream connected</span>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </section>
  );
}
