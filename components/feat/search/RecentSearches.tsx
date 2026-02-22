"use client";

import { memo } from "react";

type RecentSearchesProps = {
  items: string[];
  onSelect: (value: string) => void;
  onClear: () => void;
};

export const RecentSearches = memo(function RecentSearches({
  items,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
        <span>Recent searches</span>
        <button
          type="button"
          onClick={onClear}
          className="text-ember hover:underline"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:border-glow hover:text-ink"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});
