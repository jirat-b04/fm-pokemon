import type { ReactNode } from "react";

type BaseCardStatProps = {
  title: string;
  label?: ReactNode;
  className?: string;
};

export function BaseCardInfo({ title, label, className }: BaseCardStatProps) {
  return (
    <div className={`flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 ${className ?? ""}`.trim()}>
      <div className="text-xs uppercase tracking-wide text-slate-400">{title}</div>
      {label && <div className="text-sm font-semibold text-slate-700">{label}</div>}
    </div>
  );
}
