import { fetcher } from "@/api/fetcher";
import Leaderboard from "@/components/Leaderboard/page";
import { ScrambleTeam } from "@/types/Team";
import { Grid2 } from "@mui/material";
import { useEffect } from "react";
import useSWR from "swr";

const LeaderboardPage = async ({
  params,
}: {
  params: { scrambleId: string };
}) => {
  const scrambleId = (await params).scrambleId;

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <Leaderboard scrambleId={scrambleId} />
      </div>
    </>
  );
};

export default LeaderboardPage;
