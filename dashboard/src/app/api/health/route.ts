import { NextResponse } from "next/server";
import { getServiceUrls, getCached, setCache } from "@/lib/constants";
import type { ServiceHealth } from "@/lib/types";

const CACHE_KEY = "health";

async function checkService(
  name: string,
  url: string,
  path: string,
): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const res = await fetch(`${url}${path}`, {
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Date.now() - start;
    return {
      name,
      status: res.ok ? "healthy" : "degraded",
      latencyMs,
      url,
    };
  } catch {
    return { name, status: "down", latencyMs: null, url };
  }
}

export async function GET() {
  const cached = getCached<ServiceHealth[]>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const urls = getServiceUrls();

  const results = await Promise.allSettled([
    checkService("OpenClaw", urls.openclaw, "/health").catch(() => ({
      name: "OpenClaw",
      status: "down" as const,
      latencyMs: null,
      url: urls.openclaw,
    })),
    checkService("Paperclip", urls.paperclip, "/api/health"),
    checkService("PinchTab", urls.pinchtab, "/health"),
    checkService("AO", urls.ao, "/api/sessions"),
  ]);

  const services: ServiceHealth[] = results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { name: "Unknown", status: "unknown", latencyMs: null, url: "" },
  );

  setCache(CACHE_KEY, services, 15_000);
  return NextResponse.json(services);
}
