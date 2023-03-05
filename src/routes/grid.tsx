import { Match, Switch } from "solid-js";
import { A, createRouteData } from "solid-start";
import { RickAndMortyCharacter } from "~/components/rickAndMortyCharacter";
import { RickAndMortyCharacterGrid } from "~/components/rickAndMotyGrid";

export default function Grid() {
  const data = createRouteData(async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    return (await response.json()).results as RickAndMortyCharacter[];
  });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Grid Page
      </h1>

      <Switch>
        <Match when={data.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={data.latest}>
          <RickAndMortyCharacterGrid
            characters={data.latest ?? []}
          ></RickAndMortyCharacterGrid>
          <button class="bg-sky-800 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded mt-2">
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
