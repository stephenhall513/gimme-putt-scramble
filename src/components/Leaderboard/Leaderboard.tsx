"use client";
import { fetcher } from "@/api/fetcher";
import LeaderboardPage from "@/app/events/[eventId]/leaderboard/page";
import { ScrambleTeam } from "@/types/Team";
import { Grid2 } from "@mui/material";
import useSWR from "swr";

interface LeaderboardProp {
  scrambleId: string;
}

const Leaderboard = ({ scrambleId }: LeaderboardProp) => {
  const { data, error } = useSWR<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/leaderboard/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <Grid2
      container
      rowSpacing={1}
      columnSpacing={0}
      boxSizing="border-box"
      borderColor="black"
    >
      <Grid2 size={{ lg: 6 }}>Team</Grid2>
      <Grid2 size={{ lg: 2 }}>Team Captain</Grid2>
      <Grid2 size={{ lg: 1 }}></Grid2>
      <Grid2 size={{ lg: 1 }}>Current Hole</Grid2>
      <Grid2 size={{ lg: 1 }}>Holes Played</Grid2>
      {data?.map((team) => {
        return (
          <>
            <Grid2>{team.teamName}</Grid2>
            <Grid2>{team.captainName}</Grid2>
            <Grid2>{team.par - team.score}</Grid2>
            <Grid2>{team.currentHole}</Grid2>
            <Grid2>{team.holesPlayed}</Grid2>
          </>
        );
      })}
    </Grid2>
  );
};

export default Leaderboard;
