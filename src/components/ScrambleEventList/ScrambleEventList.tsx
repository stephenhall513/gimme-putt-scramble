import { ScrambleEvent } from "@/types/ScrambleEvent";
import { Button, Grid2 } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridEventListener,
  GridRowId,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface ScrambleEventListProps {
  scrambleEvents: ScrambleEvent[];
  onEditClick: (id: string) => void;
}

const ScrambleEventList = ({
  scrambleEvents,
  onEditClick,
}: ScrambleEventListProps) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [selected, setSelected] = useState<GridRowId>();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleEvent: GridEventListener<"rowClick"> = (
    params: GridRowParams, // GridRowParams
    event: MuiEvent<React.MouseEvent<HTMLElement>>, // MuiEvent<React.MouseEvent<HTMLElement>>
    details: GridCallbackDetails // GridCallbackDetails
  ) => {
    if (selected == params.id && !isDisabled) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setSelected(params.id);
  };

  const viewDetails = () => {
    if (selected) {
      onEditClick(selected?.toString());
    }
  };

  // const manageTeams = () => {
  //   if (selected) {
  //     onTeamClick(selected?.toString());
  //   }
  // };

  return (
    <>
      <div
        className="flex flex-col w-full min-w-full"
        style={{ width: "100%" }}
      >
        <div className="flex flex-row">
          <div className="flex-1 w-12 my-4">
            <Button
              variant="contained"
              color="secondary"
              disabled={isDisabled}
              onClick={() => viewDetails()}
            >
              View Event
            </Button>
          </div>
          {/* <div className="flex-1 w-12 my-4">
            <Button
              variant="contained"
              color="secondary"
              disabled={isDisabled}
              onClick={() => manageTeams()}
            >
              Manage Teams
            </Button>
          </div> */}
        </div>
        <DataGrid
          rows={scrambleEvents}
          disableColumnResize={true}
          disableMultipleRowSelection={true}
          onRowClick={handleEvent}
          columns={[
            {
              field: "eventName",
              headerName: "Event Name",
              width: 400,
              hideable: false,
            },
            {
              field: "organizationName",
              headerName: "Organization",
              width: 300,
              hideable: false,
            },
            {
              field: "startDate",
              headerName: "Start Date",
              width: 125,
              valueFormatter: (value) => format(value, "MM/dd/yyyy"),
              hideable: false,
            },
            {
              field: "endDate",
              headerName: "End Date",
              width: 125,
              valueFormatter: (value) => format(value, "MM/dd/yyyy"),
              hideable: false,
            },
            // {
            //   field: "id",
            //   headerName: "",
            //   sortable: false,
            //   filterable: false,
            //   hideable: false,
            //   width: 150,
            //   renderCell: (params) => (
            //     <Button
            //       variant="contained"
            //       color="primary"
            //       onClick={() => {
            //         console.log("Selected", params.row);
            //       }}
            //     >
            //       View/Edit
            //     </Button>
            //   ),
            // },
          ]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination // Enables pagination controls
          sx={{
            boxShadow: 1,
            border: 1,
            borderColor: "#000000",
            "& .MuiDataGrid-cell:hover": {
              color: "#a2a2a2",
            },
            "& .MuiDataGrid-container--top": {
              background: "#2E4706 !important",
            },
            "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *": {
              background: "#2E4706", // Dark green background
              color: "#FFFFFF", // Ensuring text color is white
            },
          }}
        />
      </div>
    </>
  );
};

export default ScrambleEventList;
