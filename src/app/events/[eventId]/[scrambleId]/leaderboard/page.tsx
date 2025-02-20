import Leaderboard from "@/components/Leaderboard/Leaderboard";

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ scrambleId: string }>;
}) {
  const scrambleId = (await params).scrambleId;

  return (
    <>
      <div>
        <Leaderboard scrambleId={scrambleId} />
      </div>
    </>
  );
}
