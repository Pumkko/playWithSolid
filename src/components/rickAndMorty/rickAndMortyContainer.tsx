import _ from "lodash";
import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { createMutable, modifyMutable, reconcile } from "solid-js/store";
import { LoadingSpinner } from "../loadingSpinner";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import { RickAndMortyCharacterGrid } from "./rickAndMortyGrid";
import {
  RickAndMortySpecieChange,
  useRickAndMorty,
} from "./rickAndMortyProvider";

export function RickAndMortyContainer() {
  const context = useRickAndMorty();

  const rickAndMortyMutableStore = createMutable<RickAndMortyCharacter[]>([]);

  createEffect(() => {
    modifyMutable(
      rickAndMortyMutableStore,
      reconcile(_.cloneDeep(context?.query.data) ?? [])
    );
  });

  const [pendingChanges, setPendingChanges] = createSignal<
    RickAndMortySpecieChange[]
  >([]);

  const onValueChanged = (change: RickAndMortySpecieChange) => {
    setPendingChanges([...pendingChanges(), change]);
  };

  const allAliens = () =>
    rickAndMortyMutableStore.every((c) => c.species === "Alien") ?? false;

  return (
    <Switch>
      <Match when={context === undefined}>Working</Match>
      <Match when={context!.query.isLoading}>
        <p>Loading...</p>
      </Match>
      <Match when={context!.query.isSuccess}>
        <RickAndMortyCharacterGrid
          rickAndMortyCharacters={rickAndMortyMutableStore}
          onValueChanged={onValueChanged}
        ></RickAndMortyCharacterGrid>

        <button
          disabled={context!.turnIntoAlien.isLoading}
          onclick={() => {
            context!.query.refetch();
          }}
          type="button"
          class="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 mt-2 focus:outline-none focus:ring-blue-300  disabled:cursor-not-allowed  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          <Show when={context!.query.isRefetching}>
            <LoadingSpinner />
          </Show>
          Refetch
        </button>

        <button
          disabled={context!.turnIntoAlien.isLoading || allAliens()}
          onclick={() => {
            context!.turnIntoAlien.mutate(undefined);
          }}
          type="button"
          class="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 mt-2 focus:outline-none focus:ring-blue-300  disabled:cursor-not-allowed disabled:opacity-70  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          <Show when={context!.turnIntoAlien.isLoading}>
            <LoadingSpinner />
          </Show>
          Turn into Aliens
        </button>
      </Match>
    </Switch>
  );
}
