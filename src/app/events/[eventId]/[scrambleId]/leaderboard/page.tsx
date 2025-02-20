import Leaderboard from "@/components/Leaderboard/Leaderboard";

export default function LeaderboardPage({
  params,
}: {
  params: { scrambleId: string };
}) {
  return (
    <>
      <div>
        <Leaderboard scrambleId={params.scrambleId} />
      </div>
    </>
  );
}
