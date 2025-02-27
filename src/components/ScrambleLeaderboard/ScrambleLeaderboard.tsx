"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleLeaderboard } from "@/types/ScrambleLeaderboard";
import { Box, Grid2 } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useSWR from "swr";

interface LeaderboardProp {
  scrambleId: string;
}

const Leaderboard = ({ scrambleId }: LeaderboardProp) => {
  const { data, error } = useSWR<ScrambleLeaderboard[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/getleaderboard/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 36,
    page: 0,
  });

  function getRowId(row: ScrambleLeaderboard) {
    return row.scrambleTeamId;
  }

  return (
    <div className="max-w-screen">
      <Box>
        <DataGrid
          hideFooterSelectedRowCount
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          disableColumnResize
          getRowId={getRowId}
          columns={[
            {
              field: "rank",
              headerName: "",
              width: 50,
            },
            {
              field: "teamName",
              headerName: "Team",
              width: 150,
            },
            {
              field: "score",
              headerName: "+/-",
              align: "center",
              headerAlign: "center",
              width: 75,
            },
            // {
            //   field: "grossScore",
            //   headerName: "Gross",
            //   align: "center",
            //   headerAlign: "center",
            //   width: 100,
            // },
            {
              field: "currentHole",
              headerName: "Thru",
              align: "center",
              headerAlign: "center",
              width: 75,
            },
            {
              field: "holesPlayed",
              headerName: "Holes Played",
              align: "center",
              headerAlign: "center",
              width: 125,
            },
          ]}
          rows={data}
          rowHeight={40}
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
      </Box>
    </div>
  );
};

export default Leaderboard;
