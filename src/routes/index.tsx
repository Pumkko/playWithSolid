import { For } from "solid-js";
import { createMutable } from "solid-js/store";
import { A } from "solid-start";

export default function Home() {
  const state = createMutable([
    {
      agentName: "Calot",
    },
    {
      agentName: "Merleaux",
    },
    {
      agentName: "Jacquart",
    },
  ]);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <div class="mt-8">
        <For each={state}>
          {(item) => (
            <div class="flex justify-center">
              <p class="mr-4">{item.agentName}</p>
              <input
                onChange={(e) => {
                  item.agentName = e.currentTarget.value;
                }}
                type="text"
                id="small-input"
                class="block p-2 text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          )}
        </For>
      </div>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>
        {" - "}
        <A href="/grid" class="text-sky-600 hover:underline">
          Grid Page
        </A>
      </p>
    </main>
  );
}
