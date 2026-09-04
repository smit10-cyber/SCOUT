"use client";

import { useCallback, useEffect, useState } from "react";
import { SavedStatus } from "@/types";
import { getAuthSession } from "@/lib/auth";

export interface SavedEntry {
  opportunityId: string;
  status: SavedStatus;
  savedAt: string;
}

function storageKey(userId?: string) {
  return userId ? `scout:saved-opportunities:${userId}` : "scout:saved-opportunities:guest";
}

function readStore(key: string): SavedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as SavedEntry[]) : [];
  } catch {
    return [];
  }
}

function writeStore(key: string, entries: SavedEntry[]) {
  window.localStorage.setItem(key, JSON.stringify(entries));
}

/**
 * Browser persistence for the MVP. Entries are now scoped to the signed-in
 * SCOUT user, so different accounts on the same device do not share saved
 * opportunities. A server database can replace this later without changing
 * the public hook API.
 */
export function useSavedOpportunities() {
  const [entries, setEntries] = useState<SavedEntry[]>([]);
  const [key, setKey] = useState(storageKey());

  useEffect(() => {
    function load() {
      const session = getAuthSession();
      const nextKey = storageKey(session?.user.id);
      setKey(nextKey);
      setEntries(readStore(nextKey));
    }
    load();
    window.addEventListener("scout-auth-change", load);
    return () => window.removeEventListener("scout-auth-change", load);
  }, []);

  const isSaved = useCallback((id: string) => entries.some((e) => e.opportunityId === id), [entries]);

  const toggleSave = useCallback((id: string) => {
    setEntries((prev) => {
      const exists = prev.some((e) => e.opportunityId === id);
      const next = exists
        ? prev.filter((e) => e.opportunityId !== id)
        : [...prev, { opportunityId: id, status: "INTERESTED" as SavedStatus, savedAt: new Date().toISOString() }];
      writeStore(key, next);
      return next;
    });
  }, [key]);

  const setStatus = useCallback((id: string, status: SavedStatus) => {
    setEntries((prev) => {
      const next = prev.map((e) => (e.opportunityId === id ? { ...e, status } : e));
      writeStore(key, next);
      return next;
    });
  }, [key]);

  const remove = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.opportunityId !== id);
      writeStore(key, next);
      return next;
    });
  }, [key]);

  return { entries, isSaved, toggleSave, setStatus, remove };
}
