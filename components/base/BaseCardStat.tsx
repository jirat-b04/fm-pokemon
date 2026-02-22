import type { ReactNode } from "react";

type BaseCardStatProps = {
  title: string;
  label?: ReactNode;
  stat?: string;
  className?: string;
};

export function BaseCardStat({ title, label, stat, className }: BaseCardStatProps) {
  return (
    <div className={`flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 ${className ?? ""}`.trim()}>
      <div className="text-xs uppercase tracking-wide text-slate-400">{title}</div>
      {(label || stat) && (
        <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>{label}</span>
          {stat && (
            <span className="text-xs uppercase tracking-wide text-slate-500">{stat}</span>
          )}
        </div>
      )}
    </div>
  );
}
