"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizePokemonName, titleize } from "@/utils/format";
import { usePokemonSuggestions } from "@/hooks/usePokemonSuggestions";

export type SearchInputProps = {
  onSearch?: (name: string) => void;
};

export function SearchInput({ onSearch }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const queryValue = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const [value, setValue] = useState(queryValue);
  const [isOpen, setIsOpen] = useState(false);

  const { suggestions } = usePokemonSuggestions(value);

  useEffect(() => {
    setValue(queryValue);
  }, [queryValue]);

  const submit = useCallback(
    (raw: string) => {
      const normalized = normalizePokemonName(raw);
      const params = new URLSearchParams(searchParams);
      if (normalized) {
        params.set("q", normalized);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        const next = params.toString();
        router.push(next ? `${pathname}?${next}` : pathname);
      });

      if (normalized) {
        onSearch?.(normalized);
      }

      setIsOpen(false);
    },
    [onSearch, pathname, router, searchParams]
  );

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        submit(value);
      }}
    >
      <label className="text-sm font-medium text-slate-200">
        Search Pokemon by name
      </label>
      <div className="relative flex w-full flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            name="q"
            placeholder="e.g., pikachu"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              setTimeout(() => setIsOpen(false), 120);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-lg text-ink shadow-sm focus:border-pokemon-red focus:outline-none focus:ring-2 focus:ring-pokemon-red/40"
          />
          {isOpen && suggestions.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              <div className="px-2 py-1 text-xs uppercase tracking-wide text-slate-400">
                Suggestions
              </div>
              <div className="flex flex-col">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => submit(item)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <span className="font-medium">{titleize(item)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:translate-y-[-1px] hover:bg-pokemon-red/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
