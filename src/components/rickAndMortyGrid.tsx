import { ColDef } from "ag-grid-community";
import { GetRowIdParams } from "ag-grid-community/dist/lib/interfaces/iCallbackParams";
import "ag-grid-community/styles/ag-grid.css"; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import AgGridSolid from "ag-grid-solid";
import { RickAndMortySpeciesGridHeader } from "./GridComponents/rickAndMortySpeciesGridHeader";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import { useRickAndMorty } from "./rickAndMortyProvider";

export function RickAndMortyCharacterGrid() {
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
      headerComponent: RickAndMortySpeciesGridHeader,
      valueGetter: (params) => params?.data && params.data.species,
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
    <div style={{ height: "500px" }} class="ag-theme-alpine">
      <AgGridSolid
        getRowId={(params: GetRowIdParams<RickAndMortyCharacter>) =>
          params.data.id.toString()
        }
        rowData={context?.query.data}
        columnDefs={columnDefs}
        rowSelection="single"
      />
    </div>
  );
}
