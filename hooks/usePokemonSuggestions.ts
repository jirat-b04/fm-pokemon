"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { POKEMON_LIST } from "@/graphql/pokemon";
import type {
  PokemonListQuery,
  PokemonListVariables,
} from "@/graphql/types";
import { normalizePokemonName } from "@/utils/format";

const DEFAULT_FIRST = 251;
const MAX_RESULTS = 8;

export function usePokemonSuggestions(input: string) {
  const { data, loading } = useQuery<PokemonListQuery, PokemonListVariables>(
    POKEMON_LIST,
    {
      variables: { first: DEFAULT_FIRST },
      fetchPolicy: "cache-first",
    }
  );

  const suggestions = useMemo(() => {
    const query = normalizePokemonName(input);
    if (!query) return [] as string[];

    const pool = (data?.pokemons ?? [])
      .map((item) => item.name)
      .filter(Boolean);

    const ranked = pool
      .filter((name) => normalizePokemonName(name).includes(query))
      .sort((a, b) => {
        const aStarts = normalizePokemonName(a).startsWith(query);
        const bStarts = normalizePokemonName(b).startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      });

    return ranked.slice(0, MAX_RESULTS);
  }, [data?.pokemons, input]);

  return { suggestions, loading };
}
