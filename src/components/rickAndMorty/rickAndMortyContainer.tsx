import { Match, Switch } from "solid-js";
import { RickAndMortyCharacterGrid } from "./rickAndMortyGrid";
import { useRickAndMorty } from "./rickAndMortyProvider";
import { RickAndMortySaveChanges } from "./rickAndMortySaveChanges";

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
        <RickAndMortySaveChanges />
      </Match>
    </Switch>
  );
}
