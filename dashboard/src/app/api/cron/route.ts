import { NextResponse } from "next/server";
import { getCached, setCache } from "@/lib/constants";
import { AGENTS } from "@/config/agents";
import type { CronJob } from "@/lib/types";

const CACHE_KEY = "cron";

function getNextCronRun(expression: string): string | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cronParser = require("cron-parser");
    const interval = cronParser.parseExpression(expression);
    return interval.next().toISOString();
  } catch {
    return null;
  }
}

export async function GET() {
  const cached = getCached<CronJob[]>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  // Try to get live cron data from openclaw CLI
  let openclawCronData: Record<
    string,
    { lastRun: string | null; lastStatus: string }
  > = {};
  try {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);
    const { stdout } = await execAsync("openclaw cron list 2>/dev/null", {
      timeout: 5000,
    });
    // Parse output — expect lines like: "job-name | 0 9 * * * | last: 2026-03-10T09:00:00Z | status: success"
    for (const line of stdout.split("\n")) {
      const match = line.match(
        /(\S+)\s*\|\s*.*?\|\s*last:\s*(\S+)\s*\|\s*status:\s*(\S+)/,
      );
      if (match) {
        openclawCronData[match[1]] = {
          lastRun: match[2] === "never" ? null : match[2],
          lastStatus: match[3],
        };
      }
    }
  } catch {
    // openclaw CLI not available
  }

  const jobs: CronJob[] = AGENTS.filter((a) => a.cron !== null).map(
    (agent) => {
      const live = openclawCronData[agent.codename.toLowerCase()];
      return {
        name: `${agent.codename} — ${agent.cronLabel}`,
        agent: agent.codename,
        expression: agent.cron!,
        lastRun: live?.lastRun || null,
        nextRun: getNextCronRun(agent.cron!),
        lastStatus: (live?.lastStatus as CronJob["lastStatus"]) || "unknown",
      };
    },
  );

  setCache(CACHE_KEY, jobs, 300_000);
  return NextResponse.json(jobs);
}
