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
  turnIntoAlien: CreateMutationResult<
    unknown,
    unknown,
    number | undefined,
    void
  >;
}

const RickAndMortyContext = createContext<RickAndMortyContextProps>();

export function RickAndMortyProvider(props: any) {
  const queryClient = useQueryClient();

  const turnIntoAlien = createMutation(["updateRickSanchez"], {
    mutationFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    },
    onMutate: (id?: number) => {
      const characters = _.cloneDeep(
        queryClient.getQueryData([
          "rickAndMortyCharacters",
        ]) as RickAndMortyCharacter[]
      );

      if (id === undefined) {
        characters.forEach((c) => {
          c.species = "Alien";
        });
      } else {
        const c = characters.find((x) => x.id === id);
        if (c) {
          c.species = "Alien";
        }
      }
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
        }, 1000);
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
