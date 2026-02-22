import Image from "next/image";
import { titleize } from "@/utils/format";
import { BaseElementTag } from "@/components/base/BaseElementTag";

type PokemonHeaderProps = {
  name: string;
  image?: string | null;
  types?: string[] | null;
  classification?: string | null;
  resistant?: string[] | null;
  weaknesses?: string[] | null;
};

export function PokemonHeader({
  name,
  image,
  types,
  classification,
  resistant,
  weaknesses,
}: PokemonHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-slate-400">
          {classification ?? "Pokemon profile"}
        </p>
        <h2 className="text-3xl font-semibold text-ink">{titleize(name)}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(types ?? []).map((type) => (
            <BaseElementTag key={type} element={type} />
          ))}
        </div>
        {resistant && resistant.length > 0 && (
          <div className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Resistant:</span>{" "}
            {resistant.join(", ")}
          </div>
        )}
        {weaknesses && weaknesses.length > 0 && (
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Weaknesses:</span>{" "}
            {weaknesses.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
