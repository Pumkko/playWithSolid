import { useRickAndMorty } from "../rickAndMortyProvider";

export function RickAndMortySpeciesGridHeader() {
  const context = useRickAndMorty();

  if (context?.query?.data === undefined) {
    return null;
  }

  // createMemo can also work
  const allAliens = () =>
    context?.query?.data?.every((c) => c.species === "Alien") ?? false;

  return (
    <div class="flex items-center mr-4">
      <input
        id="inline-checkbox"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onclick={(v) => {
          const isChecked = (v.target as HTMLInputElement).checked;
          if (isChecked) {
            context.turnIntoAlien.mutate();
          }
        }}
        checked={allAliens()}
      />
      <label
        for="inline-checkbox"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Alien Species
      </label>
    </div>
  );
}
