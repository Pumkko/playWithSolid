import { Match, Show, Switch } from "solid-js";
import { LoadingSpinner } from "../loadingSpinner";
import { RickAndMortyCharacterGrid } from "./rickAndMortyGrid";
import { useRickAndMorty } from "./rickAndMortyProvider";

export function RickAndMortyContainer() {
  const context = useRickAndMorty();

  return (
    <Switch>
      <Match when={context === undefined}>Working</Match>
      <Match when={context!.query.isLoading}>
        <p>Loading...</p>
      </Match>
      <Match when={context!.query.isSuccess}>
        <RickAndMortyCharacterGrid></RickAndMortyCharacterGrid>

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
          disabled={context!.turnIntoAlien.isLoading}
          onclick={() => {
            context!.turnIntoAlien.mutate(undefined);
          }}
          type="button"
          class="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 mt-2 focus:outline-none focus:ring-blue-300  disabled:cursor-not-allowed  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          <Show when={context!.turnIntoAlien.isLoading}>
            <LoadingSpinner />
          </Show>
          Update Grid
        </button>
      </Match>
    </Switch>
  );
}
