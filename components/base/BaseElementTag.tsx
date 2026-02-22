type BaseElementTagProps = {
  element: string;
  className?: string;
};

const ELEMENT_STYLES: Record<string, string> = {
  bug: "bg-lime-600 text-white",
  dark: "bg-slate-800 text-white",
  dragon: "bg-indigo-600 text-white",
  electric: "bg-yellow-400 text-slate-900",
  fairy: "bg-pink-400 text-slate-900",
  fighting: "bg-orange-700 text-white",
  fire: "bg-rose-600 text-white",
  flying: "bg-sky-400 text-slate-900",
  ghost: "bg-violet-700 text-white",
  grass: "bg-emerald-600 text-white",
  ground: "bg-amber-700 text-white",
  ice: "bg-cyan-300 text-slate-900",
  normal: "bg-slate-400 text-slate-900",
  poison: "bg-purple-600 text-white",
  psychic: "bg-fuchsia-500 text-white",
  rock: "bg-stone-600 text-white",
  steel: "bg-slate-500 text-white",
  water: "bg-blue-600 text-white",
};

function getElementClass(element: string) {
  const key = element.trim().toLowerCase();
  return ELEMENT_STYLES[key] ?? "bg-ink/90 text-white";
}

export function BaseElementTag({ element, className }: BaseElementTagProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getElementClass(
        element
      )} ${className ?? ""}`.trim()}
    >
      {element}
    </span>
  );
}
