import Leaderboard from "@/components/Leaderboard/Leaderboard";

export default async function LeaderboardPage({
  params,
}: {
  params: { scrambleId: string };
}) {
  const { scrambleId } = params; // No need to await

  return (
    <>
      <div>
        <Leaderboard scrambleId={scrambleId} />
      </div>
    </>
  );
}
