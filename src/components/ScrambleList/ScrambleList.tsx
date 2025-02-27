"use client";
import { Scramble } from "@/types/Scramble";
import { useEffect, useState } from "react";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import { GetScrambleEvent } from "@/api/scrambleEvent";
import { GetScrambles } from "@/api/scramble";
import { Button, Modal } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridEventListener,
  GridRowId,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ScrambleForm from "../Forms/ScrambleForm/ScrambleForm";

interface ScrambleListProps {
  scrambleEventId: string;
}

const ScrambleList = ({ scrambleEventId }: ScrambleListProps) => {
  const router = useRouter();
  const [scrambleEvent, setScrambleEvent] = useState<ScrambleEvent>();
  const [scrambles, setScrambles] = useState<Scramble[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [selected, setSelected] = useState<GridRowId>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [addOpen, setAddOpen] = useState<boolean>(false);

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

  const addScrambleClick = () => {
    setAddOpen(true);
  };

  const editScrambleClick = () => {
    router.push(
      "/myevents/events/" + scrambleEventId + "/scrambles/" + selected
    );
  };

  const editScrambleTeamsClick = () => {
    router.push(
      "/myevents/events/" +
        scrambleEventId +
        "/scrambles/" +
        selected +
        "/teams"
    );
  };

  useEffect(() => {
    const getScrambles = async () => {
      const response = await GetScrambleEvent(scrambleEventId);
      if (response.status == 200) {
        setScrambleEvent(response.data);
        const scrambleResponse = await GetScrambles(scrambleEventId);
        if (scrambleResponse.status == 200) {
          console.log("scrambles", scrambleResponse.data);
          setScrambles(scrambleResponse.data);
        }
      }

      setIsLoading(false);
    };

    getScrambles();
  }, []);

  const scrambleFormcomplete = () => {
    setAddOpen(false);
  };

  return (
    <>
      {!isLoading ? (
        <div
          className="flex flex-col w-full min-w-full"
          style={{ width: "100%" }}
        >
          <div className="flex flex-row">
            {scrambleEvent?.hasMultipleScrambles ? (
              <>
                <div className="flex-2 my-4 mr-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addScrambleClick()}
                  >
                    Add Scramble
                  </Button>
                </div>
                <Modal open={addOpen} onClose={() => setAddOpen(false)}>
                  <ScrambleForm
                    eventId={scrambleEventId}
                    allowMultiple={scrambleEvent?.hasMultipleScrambles}
                    onSuccess={() => scrambleFormcomplete()}
                    onCancel={() => setAddOpen(false)}
                  />
                </Modal>
              </>
            ) : (
              false
            )}
            <div className="flex-2 my-4 mr-4">
              <Button
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={() => editScrambleClick()}
              >
                View Scramble
              </Button>
            </div>
            <div className="flex-2 my-4">
              <Button
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={() => editScrambleTeamsClick()}
              >
                Manage Teams
              </Button>
            </div>
          </div>
          <DataGrid
            rows={scrambles}
            disableColumnResize={true}
            disableMultipleRowSelection={true}
            onRowClick={handleEvent}
            columns={[
              {
                field: "scrambleName",
                headerName: "Scramble Name",
                width: 400,
                hideable: false,
              },
              {
                field: "course.courseName",
                headerName: "Course",
                width: 200,
                hideable: false,
              },
              {
                field: "scrambleDate",
                headerName: "Date",
                width: 125,
                valueFormatter: (value) => format(value, "MM/dd/yyyy"),
                hideable: false,
              },
              {
                field: "startTime",
                headerName: "Start Time",
                width: 125,
                valueFormatter: (value) => format(value, "h:mm a"),
                hideable: false,
              },
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
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleList;
