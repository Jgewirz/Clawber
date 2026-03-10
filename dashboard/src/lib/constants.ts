// Service URLs (server-side only — read from env)
export function getServiceUrls() {
  return {
    openclaw: process.env.OPENCLAW_URL || "http://localhost:18789",
    paperclip: process.env.PAPERCLIP_URL || "http://localhost:3100",
    pinchtab: process.env.PINCHTAB_URL || "http://localhost:9867",
    ao: process.env.AO_URL || "http://localhost:3000",
  };
}

export const PAPERCLIP_COMPANY_ID =
  process.env.PAPERCLIP_COMPANY_ID || "optaimum";

// Notion DB IDs
export function getNotionConfig() {
  return {
    apiKey: process.env.NOTION_API_KEY || "",
    dbLeads: process.env.NOTION_DB_LEADS || "",
    dbOutreach: process.env.NOTION_DB_OUTREACH || "",
    dbRevenue: process.env.NOTION_DB_REVENUE || "",
    dbContentCalendar: process.env.NOTION_DB_CONTENT_CALENDAR || "",
    dbSocialContent: process.env.NOTION_DB_SOCIAL_CONTENT || "",
    dbTasks: process.env.NOTION_DB_TASKS || "",
  };
}

// PG connection
export function getPgConfig() {
  return {
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "neondb",
    user: process.env.PG_USER || "neondb_owner",
    password: process.env.PG_PASSWORD || "",
    ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
  };
}

// In-memory TTL cache for API routes
const cache = new Map<string, { data: unknown; expiresAt: number }>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache(key: string, data: unknown, ttlMs: number = 60_000) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}
