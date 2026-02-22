export function PokemonSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="animate-pulse rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="h-40 w-40 rounded-2xl bg-slate-200" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-slate-200" />
              <div className="h-6 w-20 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-16 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-3xl bg-white p-6 shadow-xl">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((__, row) => (
                <div key={row} className="h-10 rounded-xl bg-slate-100" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
