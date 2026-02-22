import { gql } from "@apollo/client";

export const POKEMON_BY_NAME = gql`
  query PokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      image
      types
      classification
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutionRequirements {
        amount
        name
      }
      evolutions {
        id
        number
        name
        image
        types
      }
    }
  }
`;

export const POKEMON_LIST = gql`
  query PokemonList($first: Int!) {
    pokemons(first: $first) {
      name
    }
  }
`;
