import { A } from "solid-start";
import { RickAndMortyContainer } from "~/components/rickAndMorty/rickAndMortyContainer";
import { RickAndMortyProvider } from "~/components/rickAndMorty/rickAndMortyProvider";

export default function Grid() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Grid Page
      </h1>

      <RickAndMortyProvider>
        <RickAndMortyContainer />
      </RickAndMortyProvider>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About
        </A>
        {" - "}
        <span>Grid Page</span>
      </p>
    </main>
  );
}
