import Leaderboard from "@/components/Leaderboard/page";
import { Grid2 } from "@mui/material";

const LeaderboardPage = async ({
  params,
}: {
  params: { scrambleId: string };
}) => {
  const scrambleId = (await params).scrambleId;

  return (
    <>
      <div>
        <Leaderboard scrambleId={scrambleId} />
      </div>
    </>
  );
};

export default LeaderboardPage;
