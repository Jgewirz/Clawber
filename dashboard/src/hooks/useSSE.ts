"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSSEOptions {
  url: string;
  maxEvents?: number;
}

export function useSSE<T>({ url, maxEvents = 100 }: UseSSEOptions) {
  const [events, setEvents] = useState<T[]>([]);
  const [connected, setConnected] = useState(false);
  const sourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.close();
    }

    const es = new EventSource(url);
    sourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as T;
        setEvents((prev) => [parsed, ...prev].slice(0, maxEvents));
      } catch {
        // skip unparseable events (heartbeats)
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
      // auto-reconnect after 5s
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };
  }, [url, maxEvents]);

  useEffect(() => {
    connect();
    return () => {
      sourceRef.current?.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  return { events, connected };
}
