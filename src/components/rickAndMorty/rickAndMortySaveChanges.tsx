import { createMutation, useQueryClient } from "@tanstack/solid-query";
import _ from "lodash";
import { Show } from "solid-js";
import { modifyMutable, reconcile } from "solid-js/store";
import { LoadingSpinner } from "../loadingSpinner";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import { useRickAndMorty } from "./rickAndMortyProvider";

export function RickAndMortySaveChanges() {
  const queryClient = useQueryClient();
  const context = useRickAndMorty();

  const turnIntoAlienMutation = createMutation(["updateRickSanchez"], {
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

  return (
    <button
      disabled={
        turnIntoAlienMutation.isLoading || context?.pendingChanges.length === 0
      }
      onclick={() => {
        turnIntoAlienMutation
          .mutateAsync(undefined)
          .then(() => modifyMutable(context?.pendingChanges, reconcile([])));
      }}
      type="button"
      class="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 mt-2 focus:outline-none focus:ring-blue-300 disabled:opacity-75 disabled:cursor-not-allowed  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
    >
      <Show when={turnIntoAlienMutation.isLoading}>
        <LoadingSpinner />
      </Show>
      Save Changes
    </button>
  );
}
