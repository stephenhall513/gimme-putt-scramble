"use client";
import { fetcher } from "@/api/fetcher";
import { Box, Grid2 } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useSWR from "swr";
import ScrambleLeaderboard from "../ScrambleLeaderboard/ScrambleLeaderboard";
import { Scramble } from "@/types/Scramble";
import ScrambleWinners from "../ScrambleWinners/ScrambleWinners";

interface EventLeaderboardsProps {
  scrambleEventId: string;
}

const ScrambleEventLeaderboard = ({
  scrambleEventId,
}: EventLeaderboardsProps) => {
  const { data: scrambleList, error: scrambleError } = useSWR<Scramble[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/scramble/GetScrambles/${scrambleEventId}`,
    fetcher
  );

  if (scrambleError) return <div>Error loading scrambles.</div>;
  if (!scrambleList) return <div>Loading...</div>;

  return (
    <Grid2 container spacing={2} className="flex flex-row justify-center">
      {scrambleList.map((scramble) => (
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={scramble.id}>
          <div
            className="text-3xl text-center"
            style={{ fontFamily: "Russo One" }}
          >
            Leaderboard
          </div>
          <div
            className="text-2xl text-center pb-2"
            style={{ fontFamily: "Russo One" }}
          >
            {scramble.course?.courseName}
          </div>
          <div className="flex flex-col justify-center">
            <ScrambleWinners scrambleId={String(scramble.id)} />
            <ScrambleLeaderboard scrambleId={String(scramble.id)} />
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ScrambleEventLeaderboard;
