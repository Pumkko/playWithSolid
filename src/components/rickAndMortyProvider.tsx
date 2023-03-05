import {
  createMutation,
  CreateMutationResult,
  createQuery,
  CreateQueryResult,
  useQueryClient,
} from "@tanstack/solid-query";
import _ from "lodash";
import { createContext, useContext } from "solid-js";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";

interface RickAndMortyContextProps {
  query: CreateQueryResult<RickAndMortyCharacter[], unknown>;
  turnIntoAlien: CreateMutationResult<unknown, unknown, void, void>;
}

const RickAndMortyContext = createContext<RickAndMortyContextProps>();

export function RickAndMortyProvider(props: any) {
  const queryClient = useQueryClient();

  const turnIntoAlien = createMutation(["updateRickSanchez"], {
    mutationFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 10000);
      });
    },
    onMutate: () => {
      const characters = _.cloneDeep(
        queryClient.getQueryData([
          "rickAndMortyCharacters",
        ]) as RickAndMortyCharacter[]
      );

      characters.forEach((c) => {
        c.species = "Alien";
      });
      queryClient.setQueryData(["rickAndMortyCharacters"], characters);
    },
  });

  const query = createQuery(() => ["rickAndMortyCharacters"], {
    queryFn: async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const characters = (await response.json())
        .results as RickAndMortyCharacter[];
      return new Promise<RickAndMortyCharacter[]>((resolve) => {
        setTimeout(() => {
          resolve(characters);
        }, 3000);
      });
    },
  });

  return (
    <RickAndMortyContext.Provider value={{ query, turnIntoAlien }}>
      {props.children}
    </RickAndMortyContext.Provider>
  );
}

export function useRickAndMorty() {
  return useContext(RickAndMortyContext);
}
