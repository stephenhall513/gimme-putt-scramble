"use client";
import {
  DeleteScrambleTeam,
  GetScramble,
  GetScrambleTeams,
  UploadScrambleTeams,
} from "@/api/scramble";
import { ScrambleTeam } from "@/types/Team";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridEventListener,
  GridRowId,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScrambleTeamUpload from "../Forms/ScrambleTeamUpload/ScrambleTeamUpload";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import ScrambleTeamForm from "../Forms/ScrambleTeamForm/ScrambleTeamForm";
import Loader from "../Loader";
import { Scramble } from "@/types/Scramble";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

interface ScrambleTeamsListProps {
  scrambleId: string;
  //   onEditClick: (id: string) => void;
  //   onTeamClick: (id: string) => void;
}

const ScrambleTeamsList = ({ scrambleId }: ScrambleTeamsListProps) => {
  const [selected, setSelected] = useState<GridRowId>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  //const [scrambleTeams, setScrambleTeams] = useState<ScrambleTeam[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [scramble, setScramble] = useState<Scramble>();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("this team");

  const {
    data: scrambleTeams,
    error,
    mutate,
    isLoading,
  } = useSWR<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/scrambleteams/" + scrambleId,
    fetcher
  );

  useEffect(() => {
    const getScramble = async () => {
      const response = await GetScramble(scrambleId);

      if (response.status == 200) {
        setScramble(response.data);
      }
    };

    getScramble();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    mutate();
  };

  const confirmDelete = () => {
    const selectedTeam = scrambleTeams?.find((x) => x.id == String(selected));
    if (selectedTeam) {
      setConfirmMessage(selectedTeam?.teamName);
      setIsDeleteOpen(true);
    }
  };

  const deleteTeam = async () => {
    const deleteResponse = await DeleteScrambleTeam(String(selected));
    if (deleteResponse.status == 200) {
      mutate();
      setIsDeleteOpen(false);
      toast.success("Team Deleted");
    }
  };

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

  if (isLoading) return <Loader />;

  return (
    <>
      <div
        className="text-center text-xl pb-6"
        style={{ fontFamily: "Russo One" }}
      >
        {scramble?.scrambleName} Teams Page
      </div>
      <div
        className="flex flex-col w-full min-w-full"
        style={{ width: "100%" }}
      >
        <div className="flex flex-row">
          <div className="flex-2 my-4 mr-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsFormOpen(true)}
            >
              Add Team
            </Button>
          </div>
          <div className="flex-2 my-4 mr-4">
            <Button variant="contained" color="primary" disabled={isDisabled}>
              Edit Team
            </Button>
          </div>
          <div className="flex-2 my-4 mr-4">
            <Button
              variant="contained"
              color="primary"
              disabled={isDisabled}
              onClick={() => confirmDelete()}
            >
              Delete Team
            </Button>
          </div>
          <div className="flex-2 my-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Upload Teams
            </Button>
          </div>
        </div>
        <DataGrid
          rows={scrambleTeams}
          disableColumnResize={true}
          disableMultipleRowSelection={true}
          onRowClick={handleEvent}
          columns={[
            {
              field: "teamName",
              headerName: "Team Name",
              width: 350,
              hideable: false,
            },
            {
              field: "captainName",
              headerName: "Captain Name",
              width: 300,
              hideable: false,
            },
            {
              field: "captainEmail",
              headerName: "Captain Email",
              width: 250,
              hideable: false,
            },
            {
              field: "startingHole",
              headerName: "Starting Hole",
              width: 125,
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
        <ScrambleTeamUpload
          scrambleId={scrambleId}
          isOpen={isModalOpen}
          close={closeModal}
        />
        <ScrambleTeamForm
          scrambleId={scrambleId}
          isOpen={isFormOpen}
          close={() => setIsFormOpen(false)}
        />
        <DeleteConfirmation
          isOpen={isDeleteOpen}
          message={confirmMessage}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => deleteTeam()}
        />
      </div>
    </>
  );
};

export default ScrambleTeamsList;
