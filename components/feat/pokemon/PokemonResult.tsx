"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { POKEMON_BY_NAME } from "@/graphql/pokemon";
import type {
  PokemonByNameQuery,
  PokemonByNameVariables,
} from "@/graphql/types";
import { titleize } from "@/utils/format";
import { PokemonSkeleton } from "@/components/feat/pokemon/PokemonSkeleton";
import { BaseCard } from "@/components/base/BaseCard";
import { BaseCardInfo } from "@/components/base/BaseCardInfo";
import { BaseCardStat } from "@/components/base/BaseCardStat";
import { PokemonHeader } from "@/components/base/PokemonHeader";

export function PokemonResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("q") ?? "";

  const { data, loading, error } = useQuery<
    PokemonByNameQuery,
    PokemonByNameVariables
  >(POKEMON_BY_NAME, {
    variables: { name },
    skip: !name,
    notifyOnNetworkStatusChange: true,
  });

  const pokemon = data?.pokemon ?? null;

  const stats = useMemo(() => {
    if (!pokemon) return [];
    return [
      { title: "Number", label: pokemon.number ?? "?" },
      { title: "Classification", label: pokemon.classification ?? "Unknown" },
      { title: "Max CP", label: pokemon.maxCP?.toString() ?? "-" },
      { title: "Max HP", label: pokemon.maxHP?.toString() ?? "-" },
      { title: "Flee Rate", label: pokemon.fleeRate?.toFixed(2) ?? "-" },
      {
        title: "Height",
        label: pokemon.height
          ? `${pokemon.height.minimum} - ${pokemon.height.maximum}`
          : "-",
      },
      {
        title: "Weight",
        label: pokemon.weight
          ? `${pokemon.weight.minimum} - ${pokemon.weight.maximum}`
          : "-",
      },
    ];
  }, [pokemon]);

  if (!name) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-sm text-slate-500">
        Start by searching for a Pokemon name. Try "pikachu" or "charizard".
      </div>
    );
  }

  if (loading) {
    return <PokemonSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-sm text-rose-700">
        Something went wrong while loading this Pokemon. {error.message}
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-sm text-amber-700">
        No Pokemon found for "{name}". Check the spelling and try again.
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <BaseCard
        header={
          <PokemonHeader
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
            classification={pokemon.classification}
            resistant={pokemon.resistant}
            weaknesses={pokemon.weaknesses}
          />
        }
      >
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <BaseCardInfo key={stat.title} title={stat.title} label={stat.label} />
          ))}
        </div>
      </BaseCard>

      <div className="flex flex-col gap-6">
        <BaseCard header={<h3 className="text-lg font-semibold text-ink">Attacks</h3>}>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Fast</p>
              <ul className="mt-2 grid gap-2 text-sm text-slate-600">
                {(pokemon.attacks?.fast ?? []).map((attack) => (
                  <li key={attack.name}>
                    <BaseCardStat
                      title={attack.name}
                      label={attack.type}
                      stat={String(attack.damage)}
                    />
                  </li>
                ))}
                {(pokemon.attacks?.fast ?? []).length === 0 && (
                  <li className="text-slate-400">No fast attacks listed.</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Special</p>
              <ul className="mt-2 grid gap-2 text-sm text-slate-600">
                {(pokemon.attacks?.special ?? []).map((attack) => (
                  <li key={attack.name}>
                    <BaseCardStat
                      title={attack.name}
                      label={attack.type}
                      stat={String(attack.damage)}
                    />
                  </li>
                ))}
                {(pokemon.attacks?.special ?? []).length === 0 && (
                  <li className="text-slate-400">No special attacks listed.</li>
                )}
              </ul>
            </div>
          </div>
        </BaseCard>

        <BaseCard
          header={
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">Evolutions</h3>
              {pokemon.evolutionRequirements && (
                <span className="text-xs text-slate-500">
                  Requires {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
                </span>
              )}
            </div>
          }
        >
          <div className="mt-4 grid gap-3">
            {(pokemon.evolutions ?? []).map((evolution) => (
              <button
                key={evolution.name}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("q", evolution.name.toLowerCase());
                  router.push(`?${params.toString()}`);
                }}
                className="text-left"
              >
                <BaseCardStat
                  title={titleize(evolution.name)}
                  label={evolution.types?.join(" / ") ?? "Unknown"}
                />
              </button>
            ))}
            {(pokemon.evolutions ?? []).length === 0 && (
              <p className="text-sm text-slate-400">This Pokemon has no evolutions.</p>
            )}
          </div>
        </BaseCard>
      </div>
    </section>
  );
}
