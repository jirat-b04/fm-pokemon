import type { ReactNode } from "react";

type BaseCardProps = {
  header?: ReactNode;
  children: ReactNode;
  headerClassName?: string;
};

export function BaseCard({ header, children, headerClassName }: BaseCardProps) {
  return (
    <section className="rounded-3xl bg-pokemon-white p-6 shadow-xl">
      {header && <header className={headerClassName}>{header}</header>}
      {children}
    </section>
  );
}
