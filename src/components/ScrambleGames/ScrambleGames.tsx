"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleLongDrive } from "@/types/ScrambleLongDrive";
import { Box, Button, Container, Grid2, Modal } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridEventListener,
  GridRowId,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import useSWR from "swr";
import ScrambleLongDriveForm from "../Forms/ScrambleLongDriveForm/ScrambleLongDriveForm";
import { boolean } from "yup";
import { useState } from "react";
import ScrambleCTPForm from "../Forms/ScrambleCTPForm/ScrambleCTPDriveForm";

interface ScrambleGamesProps {
  scrambleId: string;
}

const ScrambleGames = ({ scrambleId }: ScrambleGamesProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  const [selectedCTP, setSelectedCTP] = useState<GridRowId>();
  const [selectedLongDrive, setSelectedLongDrive] = useState<GridRowId>();
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    data: longDrives,
    error: longDriveError,
    isLoading: isLoadingLongDrives,
    mutate: mutateLongDrives,
  } = useSWR<ScrambleLongDrive[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/longdrives/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  const flattenedLongDrives = longDrives?.map((drive) => ({
    ...drive,
    holeNumber: drive.hole?.holeNumber || "N/A", // Flatten holeNumber
  }));

  const {
    data: ctps,
    error: ctpError,
    isLoading: isLoadingCTPs,
    mutate: mutateCTPs,
  } = useSWR<ScrambleLongDrive[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/ctps/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  const flattenedCTPs = ctps?.map((ctp) => ({
    ...ctp,
    holeNumber: ctp.hole?.holeNumber || "N/A", // Flatten holeNumber
  }));

  const handleCTPEvent: GridEventListener<"rowClick"> = (
    params: GridRowParams, // GridRowParams
    event: MuiEvent<React.MouseEvent<HTMLElement>>, // MuiEvent<React.MouseEvent<HTMLElement>>
    details: GridCallbackDetails // GridCallbackDetails
  ) => {
    if (selectedCTP == params.id && !isDisabled) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setSelectedCTP(params.id);
  };

  const handleLongDriveEvent: GridEventListener<"rowClick"> = (
    params: GridRowParams, // GridRowParams
    event: MuiEvent<React.MouseEvent<HTMLElement>>, // MuiEvent<React.MouseEvent<HTMLElement>>
    details: GridCallbackDetails // GridCallbackDetails
  ) => {
    if (selectedLongDrive == params.id && !isDisabled) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setSelectedLongDrive(params.id);
  };

  return (
    <>
      <Box className="h-full my-5">
        <div className="py-5" style={{ fontFamily: "Russo One" }}>
          Set up Long Drive or Closest to Pin Competition before the start of
          the scramble so the indicator on the hole will be displayed
        </div>
        <Grid2 container columnSpacing={6}>
          <Grid2 size={{ md: 6, sm: 12 }}>
            <div className="text-2xl" style={{ fontFamily: "Russo One" }}>
              Long Drive
            </div>
            <div className="flex flex-row">
              <div className="flex-2 my-4 mr-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                    setFormType("LongDrive");
                  }}
                >
                  Add Long Drive
                </Button>
              </div>
              <div className="flex-2 my-4 mr-4">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedLongDrive ? false : true}
                  onClick={() => {
                    setIsModalOpen(true);
                    setFormType("LongDrive");
                  }}
                >
                  Edit Long Drive
                </Button>
              </div>
            </div>
            <DataGrid
              hideFooterSelectedRowCount
              disableColumnFilter
              disableColumnMenu
              disableColumnSorting
              disableColumnResize
              onRowClick={handleLongDriveEvent}
              columns={[
                {
                  field: "holeNumber",
                  headerName: "Hole #",
                  width: 150,
                },
                {
                  field: "golferName",
                  headerName: "Golfer",
                  width: 150,
                },
              ]}
              rows={flattenedLongDrives}
              rowHeight={40}
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
                "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *":
                  {
                    background: "#2E4706", // Dark green background
                    color: "#FFFFFF", // Ensuring text color is white
                  },
              }}
            />
          </Grid2>
          <Grid2 size={{ md: 6, sm: 12 }}>
            <div className="text-2xl" style={{ fontFamily: "Russo One" }}>
              Closest To Pin
            </div>
            <div className="flex flex-row">
              <div className="flex-2 my-4 mr-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                    setFormType("CTP");
                  }}
                >
                  Add Closest To Pin
                </Button>
              </div>
              <div className="flex-2 my-4 mr-4">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedCTP ? false : true}
                  onClick={() => {
                    setIsModalOpen(true);
                    setFormType("CTP");
                  }}
                >
                  Edit Closest To Pin
                </Button>
              </div>
            </div>
            <DataGrid
              hideFooterSelectedRowCount
              disableColumnFilter
              disableColumnMenu
              disableColumnSorting
              disableColumnResize
              onRowClick={handleCTPEvent}
              columns={[
                {
                  field: "holeNumber",
                  headerName: "Hole #",
                  width: 150,
                },
                {
                  field: "golferName",
                  headerName: "Golfer",
                  width: 150,
                },
              ]}
              rows={flattenedCTPs}
              rowHeight={40}
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
                "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *":
                  {
                    background: "#2E4706", // Dark green background
                    color: "#FFFFFF", // Ensuring text color is white
                  },
              }}
            />
          </Grid2>
        </Grid2>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
          {formType == "LongDrive" ? (
            <Container className="bg-white rounded p-5">
              {selectedLongDrive
                ? "Edit Long Drive Competition"
                : "Add Long Drive Competition"}
              <ScrambleLongDriveForm
                scrambleId={scrambleId}
                scrambleLongDriveId={
                  selectedLongDrive ? String(selectedLongDrive) : undefined
                }
                close={() => {
                  setIsModalOpen(false);
                  setSelectedLongDrive(undefined);
                  mutateLongDrives();
                }}
              />
            </Container>
          ) : (
            false
          )}

          {formType == "CTP" ? (
            <Container className="bg-white rounded p-5">
              {selectedCTP
                ? "Edit Closest To Pin Competition"
                : "Add Closest To Pin Competition"}
              <ScrambleCTPForm
                scrambleId={scrambleId}
                scrambleCtpId={selectedCTP ? String(selectedCTP) : undefined}
                close={() => {
                  setIsModalOpen(false);
                  setSelectedCTP(undefined);
                  mutateCTPs();
                }}
              />
            </Container>
          ) : (
            false
          )}
        </div>
      </Modal>
    </>
  );
};

export default ScrambleGames;
