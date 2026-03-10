import { getServiceUrls, getPgConfig } from "@/lib/constants";
import type { ActivityEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();
  const urls = getServiceUrls();
  const pgConfig = getPgConfig();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      function send(data: unknown) {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        } catch {
          closed = true;
        }
      }

      // Heartbeat every 15s
      const heartbeat = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          closed = true;
        }
      }, 15_000);

      // Poll AO for sessions
      const aoPoll = setInterval(async () => {
        if (closed) return;
        try {
          const res = await fetch(`${urls.ao}/api/sessions`, {
            signal: AbortSignal.timeout(5000),
          });
          if (res.ok) {
            const sessions = await res.json();
            send({ type: "sessions", sessions });
          }
        } catch {
          // AO unavailable
        }
      }, 5_000);

      // Poll PG for recent activity
      const pgPoll = setInterval(async () => {
        if (closed) return;
        if (!pgConfig.password) return;
        try {
          const { Pool } = await import("pg");
          const pool = new Pool({
            host: pgConfig.host,
            database: pgConfig.database,
            user: pgConfig.user,
            password: pgConfig.password,
            ssl: pgConfig.ssl || undefined,
            max: 1,
            connectionTimeoutMillis: 3000,
          });
          const result = await pool.query(
            `SELECT id, created_at as timestamp, agent, action, status
             FROM agent_activity_log
             ORDER BY created_at DESC
             LIMIT 10`,
          );
          const events: ActivityEvent[] = result.rows.map((r) => ({
            id: r.id,
            timestamp: r.timestamp,
            agent: r.agent,
            action: r.action,
            status: r.status || "info",
          }));
          send({ type: "activity", events });
          await pool.end();
        } catch {
          // PG unavailable or table doesn't exist
        }
      }, 10_000);

      // Send initial event
      send({ type: "connected", timestamp: new Date().toISOString() });

      // Cleanup on close
      const cleanup = () => {
        closed = true;
        clearInterval(heartbeat);
        clearInterval(aoPoll);
        clearInterval(pgPoll);
      };

      // The stream will be cancelled when the client disconnects
      // We use a timeout to eventually clean up if something goes wrong
      setTimeout(() => {
        if (!closed) cleanup();
      }, 3_600_000); // 1 hour max
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
