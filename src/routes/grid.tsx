import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import _ from "lodash";
import { Match, Switch } from "solid-js";
import { A } from "solid-start";
import { RickAndMortyCharacter } from "~/components/rickAndMortyCharacter";
import { RickAndMortyCharacterGrid } from "~/components/rickAndMotyGrid";

export default function Grid() {
  const queryClient = useQueryClient();

  const query = createQuery(() => ["rickAndMortyCharacters"], {
    queryFn: async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      return (await response.json()).results as RickAndMortyCharacter[];
    },
  });

  const mutation = createMutation(["updateRickSanchez"], {
    mutationFn: () => {
      return Promise.resolve(true);
    },
    onMutate: () => {
      const characters = _.cloneDeep(
        queryClient.getQueryData([
          "rickAndMortyCharacters",
        ]) as RickAndMortyCharacter[]
      );

      characters[0].name = "HOOOO";
      queryClient.setQueryData(["rickAndMortyCharacters"], characters);
    },
  });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Grid Page
      </h1>

      <Switch>
        <Match when={query.isLoading}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isSuccess}>
          <RickAndMortyCharacterGrid
            characters={query.data!}
          ></RickAndMortyCharacterGrid>
          <button
            onclick={() => {
              mutation.mutate();
            }}
            class="bg-sky-800 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Button
          </button>
        </Match>
      </Switch>

      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <span>About Page</span>
      </p>
    </main>
  );
}
