"use client";
import { GetScrambleSponsors } from "@/api/scrambleEvent";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SponsorForm from "../Forms/SponsorForm/SponsorForm";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import toast from "react-hot-toast";
import { DeleteScrambleSponsor } from "@/api/scramble";

interface SponsorListProps {
  scrambleEventId: string;
}

const SponsorList = ({ scrambleEventId }: SponsorListProps) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [selected, setSelected] = useState<GridRowId>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("this team");

  const {
    data: sponsors,
    error,
    mutate,
    isLoading,
  } = useSWR<ScrambleSponsor[]>(
    process.env.NEXT_PUBLIC_API_URL +
      "/event/scramblesponsors/" +
      scrambleEventId,
    fetcher
  );

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

  const close = async () => {
    mutate();
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    const selectedSponsor = sponsors?.find((x) => x.id == String(selected));
    if (selectedSponsor) {
      setConfirmMessage(selectedSponsor.sponsorName);
      setIsDeleteOpen(true);
    }
  };

  const deleteTeam = async () => {
    const deleteResponse = await DeleteScrambleSponsor(String(selected));
    if (deleteResponse.status == 200) {
      mutate();
      setIsDeleteOpen(false);
      toast.success("Sponsor Deleted");
    }
  };

  return (
    <>
      {!isLoading ? (
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
                Add Sponsor
              </Button>
            </div>
            <div className="flex-2 my-4 mr-4">
              <Button variant="contained" color="primary" disabled={isDisabled}>
                Edit Sponsor
              </Button>
            </div>
            <div className="flex-2 my-4 mr-4">
              <Button
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={() => confirmDelete()}
              >
                Delete Sponsor
              </Button>
            </div>
          </div>
          <DataGrid
            rows={sponsors}
            disableColumnResize={true}
            disableMultipleRowSelection={true}
            onRowClick={handleEvent}
            columns={[
              {
                field: "sponsorName",
                headerName: "Sponsor Name",
                width: 200,
                hideable: false,
              },
              {
                field: "sponsorEmail",
                headerName: "Email",
                width: 200,
                hideable: false,
              },
              {
                field: "sponsorWebsite",
                headerName: "Website",
                width: 200,
                hideable: false,
              },
              {
                field: "sponsorPhone",
                headerName: "Phone",
                width: 125,
                hideable: false,
              },
              {
                field: "sponsorType",
                headerName: "Type",
                width: 125,
                hideable: false,
              },
              {
                field: "holeNumber",
                headerName: "Hole #",
                width: 75,
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
          <SponsorForm
            scrambleEventId={scrambleEventId}
            isOpen={isFormOpen}
            close={() => close()}
          />
          <DeleteConfirmation
            isOpen={isDeleteOpen}
            message={confirmMessage}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => deleteTeam()}
          />
        </div>
      ) : (
        <div>Is Loading...</div>
      )}
    </>
  );
};

export default SponsorList;
