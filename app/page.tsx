"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/feat/search/SearchInput";
import { PokemonResult } from "@/components/feat/pokemon/PokemonResult";
import { ClientErrorBoundary } from "@/components/feat/error/ClientErrorBoundary";
import { RecentSearches } from "@/components/feat/search/RecentSearches";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { normalizePokemonName } from "@/utils/format";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const { items, save, clear } = useRecentSearches();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentQuery = useMemo(
    () => searchParams.get("q") ?? "",
    [searchParams]
  );

  useEffect(() => {
    if (!currentQuery) return;
    save(currentQuery);
  }, [currentQuery, save]);

  const selectRecent = useCallback(
    (value: string) => {
      const normalized = normalizePokemonName(value);
      const params = new URLSearchParams(searchParams);
      params.set("q", normalized);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="rounded-3xl bg-white/80 p-8 shadow-xl">
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
          Search Pokemon
        </h1>
        <div className="mt-10 flex flex-col gap-6">
          <SearchInput onSearch={save} />
          <RecentSearches items={items} onSelect={selectRecent} onClear={clear} />
        </div>
      </header>

      <ClientErrorBoundary>
        <PokemonResult />
      </ClientErrorBoundary>
    </main>
  );
}
