"use client";

import { usePolling } from "@/hooks/usePolling";
import { AGENTS } from "@/config/agents";
import { AgentCard } from "./AgentCard";
import type { AgentStatus } from "@/lib/types";

export function AgentGrid() {
  const { data: statuses } = usePolling<AgentStatus[]>({
    url: "/api/agents",
    intervalMs: 60_000,
    initialData: [],
  });

  const statusMap = new Map(statuses.map((s) => [s.codename, s]));

  return (
    <section>
      <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
        Agents
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AGENTS.map((agent) => (
          <AgentCard
            key={agent.codename}
            agent={agent}
            status={statusMap.get(agent.codename) || null}
          />
        ))}
      </div>
    </section>
  );
}
