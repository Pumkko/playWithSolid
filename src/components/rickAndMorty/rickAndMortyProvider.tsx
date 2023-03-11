import { createQuery, CreateQueryResult } from "@tanstack/solid-query";
import _ from "lodash";
import { batch, createContext, createEffect, useContext } from "solid-js";
import { createMutable, modifyMutable, reconcile } from "solid-js/store";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";

interface RickAndMortySpecieChange {
  id: number;
  newSpecie: string;
  oldSpecie: string;
}

interface RickAndMortyContextProps {
  query: CreateQueryResult<RickAndMortyCharacter[], unknown>;
  pendingChanges: RickAndMortySpecieChange[];
  rickAndMortyCharacterStore: RickAndMortyCharacter[];
  turnIntoAlien: (id?: number) => void;
  refetch: () => Promise<void>;
}

const RickAndMortyContext = createContext<RickAndMortyContextProps>();

export function RickAndMortyProvider(props: any) {
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

  const pendingChanges = createMutable<RickAndMortySpecieChange[]>([]);

  const rickAndMortyCharacterStore = createMutable<RickAndMortyCharacter[]>([]);

  createEffect(() => {
    modifyMutable(
      rickAndMortyCharacterStore,
      reconcile(_.cloneDeep(query.data ?? []))
    );
  });

  const refetch = () => {
    return query.refetch().then(() => {
      modifyMutable(
        rickAndMortyCharacterStore,
        reconcile(_.cloneDeep(query.data ?? []))
      );
      modifyMutable(pendingChanges, reconcile([]));
    });
  };

  const turnIntoAlien = (id?: number) => {
    batch(() => {
      rickAndMortyCharacterStore
        .filter((r) => (id ? r.id === id : true))
        .forEach((c) => {
          pendingChanges.push({
            id: c.id,
            newSpecie: "Alien",
            oldSpecie: c.species,
          });
          c.species = "Alien";
        });
    });
  };

  return (
    <RickAndMortyContext.Provider
      value={{
        query,
        turnIntoAlien,
        pendingChanges,
        rickAndMortyCharacterStore,
        refetch,
      }}
    >
      {props.children}
    </RickAndMortyContext.Provider>
  );
}

export function useRickAndMorty() {
  return useContext(RickAndMortyContext);
}
