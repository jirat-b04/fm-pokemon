export type PokemonAttack = {
  name: string;
  type: string;
  damage: number;
};

export type PokemonEvolution = {
  id?: string | null;
  number?: string | null;
  name: string;
  image?: string | null;
  types?: string[] | null;
};

export type PokemonProfile = {
  minimum: string;
  maximum: string;
};

export type PokemonDetails = {
  id?: string | null;
  number?: string | null;
  name: string;
  image?: string | null;
  types?: string[] | null;
  classification?: string | null;
  resistant?: string[] | null;
  weaknesses?: string[] | null;
  fleeRate?: number | null;
  maxCP?: number | null;
  maxHP?: number | null;
  height?: PokemonProfile | null;
  weight?: PokemonProfile | null;
  attacks?: {
    fast?: PokemonAttack[] | null;
    special?: PokemonAttack[] | null;
  } | null;
  evolutionRequirements?: {
    amount?: number | null;
    name?: string | null;
  } | null;
  evolutions?: PokemonEvolution[] | null;
};

export type PokemonByNameQuery = {
  pokemon?: PokemonDetails | null;
};

export type PokemonByNameVariables = {
  name: string;
};

export type PokemonListItem = {
  name: string;
};

export type PokemonListQuery = {
  pokemons?: PokemonListItem[] | null;
};

export type PokemonListVariables = {
  first: number;
};
