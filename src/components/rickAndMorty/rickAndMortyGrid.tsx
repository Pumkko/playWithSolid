import { ColDef, GridApi, ICellRendererParams } from "ag-grid-community";
import { GetRowIdParams } from "ag-grid-community/dist/lib/interfaces/iCallbackParams";
import "ag-grid-community/styles/ag-grid.css"; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import AgGridSolid from "ag-grid-solid";
import { createSignal, Show } from "solid-js";
import { PencilSquareIcon } from "../editIcon";
import { LoadingSpinner } from "../loadingSpinner";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import { useRickAndMorty } from "./rickAndMortyProvider";
import { RickAndMortySpeciesGridHeader } from "./rickAndMortySpeciesGridHeader";

export function RickAndMortyCharacterGrid() {
  const context = useRickAndMorty();

  const allAliens = () =>
    context?.rickAndMortyCharacterStore.every((c) => c.species === "Alien") ??
    false;

  const [gridApi, setGridApi] = createSignal<GridApi>();

  const columnDefs: ColDef<RickAndMortyCharacter>[] = [
    {
      headerName: "Name",
      valueGetter: (params) => params?.data && params.data.name,
      flex: 1,
    },
    {
      headerName: "Status",
      valueGetter: (params) => params?.data && params.data.status,
      flex: 1,
    },
    {
      colId: "species",
      headerComponent: RickAndMortySpeciesGridHeader,
      valueGetter: (params) => params?.data && params.data.species,
      cellRenderer: (params: ICellRendererParams<RickAndMortyCharacter>) => {
        return (
          <div class="inline-flex items-center justify-between w-full">
            {params.value}{" "}
            <PencilSquareIcon
              onClick={() => {
                params.api.startEditingCell({
                  colKey: "species",
                  rowIndex: params.rowIndex,
                });
              }}
              class="h-6 w-6 text-gray-500 cursor-pointer"
            />
          </div>
        );
      },
      editable: true,
      valueSetter: (params) => {
        if (
          params.newValue === params.oldValue ||
          params?.data === undefined ||
          context === undefined
        ) {
          return false;
        }

        context?.turnIntoAlien(params.data.id);
        return true;
      },
      flex: 1,
    },
    {
      headerName: "Type",
      valueGetter: (params) => params?.data && params.data.type,
      flex: 1,
    },
    {
      headerName: "Gender",
      valueGetter: (params) => params?.data && params.data.gender,
      flex: 1,
    },
    {
      headerName: "Origin",
      valueGetter: (params) => params?.data && params.data.origin.name,
      flex: 1,
    },
    {
      headerName: "Location",
      valueGetter: (params) => params?.data && params.data.location.name,
      flex: 1,
    },
    {
      headerName: "Created",
      valueGetter: (params) => params?.data && params.data.created,
      flex: 1,
    },
  ];

  return (
    <>
      <div style={{ height: "60vh" }} class="ag-theme-alpine">
        <AgGridSolid
          getRowId={(params: GetRowIdParams<RickAndMortyCharacter>) =>
            params.data.id.toString()
          }
          onGridReady={(event) => {
            setGridApi(event.api);
            event.api.setRowData(context?.rickAndMortyCharacterStore ?? []);
          }}
          columnDefs={columnDefs}
          suppressRowClickSelection={true}
        />
      </div>
      <button
        disabled={context!.turnIntoAlienMutation.isLoading}
        onclick={() => {
          context!.refetch().then(() => gridApi()?.refreshCells());
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
        disabled={context!.turnIntoAlienMutation.isLoading || allAliens()}
        onclick={() => {
          context?.turnIntoAlien();

          gridApi()?.refreshCells();
        }}
        type="button"
        class="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 mt-2 focus:outline-none focus:ring-blue-300  disabled:cursor-not-allowed disabled:opacity-70  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
      >
        <Show when={context!.turnIntoAlienMutation.isLoading}>
          <LoadingSpinner />
        </Show>
        Turn into Aliens
      </button>
    </>
  );
}
