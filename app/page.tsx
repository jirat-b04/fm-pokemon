import { Suspense } from "react";
import { HomeClient } from "@/components/feat/search/HomeClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
          <header className="rounded-3xl bg-white/80 p-8 shadow-xl">
            <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-10 h-24 animate-pulse rounded-2xl bg-slate-100" />
          </header>
        </main>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
