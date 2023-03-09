import { ColDef, ICellRendererParams } from "ag-grid-community";
import { GetRowIdParams } from "ag-grid-community/dist/lib/interfaces/iCallbackParams";
import "ag-grid-community/styles/ag-grid.css"; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import AgGridSolid from "ag-grid-solid";
import { PencilSquareIcon } from "../editIcon";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import {
  RickAndMortySpecieChange,
  useRickAndMorty,
} from "./rickAndMortyProvider";
import { RickAndMortySpeciesGridHeader } from "./rickAndMortySpeciesGridHeader";

export interface RickAndMortyCharactersGridProps {
  rickAndMortyCharacters: RickAndMortyCharacter[];
  onValueChanged: (change: RickAndMortySpecieChange) => void;
}

export function RickAndMortyCharacterGrid(
  props: RickAndMortyCharactersGridProps
) {
  const context = useRickAndMorty();

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

        params.data.species = params.newValue;

        props.onValueChanged({
          id: params.data.id,
          newSpecie: params.newValue,
          oldSpecie: params.oldValue,
        });
        params.api.stopEditing();

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
          // avoid a bug where agGrid tries to access the api through the option but it's undefined
          onGridReady={(e) => e.api.setRowData(props.rickAndMortyCharacters)}
          columnDefs={columnDefs}
          suppressRowClickSelection={true}
        />
      </div>
    </>
  );
}
