import Leaderboard from "@/components/Leaderboard/Leaderboard";

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
