"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "recentPokemonSearches";
const MAX_ITEMS = 6;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(readStorage());
  }, []);

  const save = useCallback((name: string) => {
    const normalized = name.trim();
    if (!normalized) return;
    setItems((prev) => {
      const next = [normalized, ...prev.filter((item) => item !== normalized)];
      const limited = next.slice(0, MAX_ITEMS);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      }
      return limited;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const hasItems = useMemo(() => items.length > 0, [items.length]);

  return { items, save, clear, hasItems };
}
