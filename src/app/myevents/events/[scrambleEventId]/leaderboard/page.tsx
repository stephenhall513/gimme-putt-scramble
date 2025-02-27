import Loader from "@/components/Loader";
import ScrambleEventLeaderboard from "@/components/ScrambleEventLeaderboard/ScrambleEventLeaderboard";
import { Box, Container } from "@mui/material";

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ scrambleEventId: string }>;
}) {
  const scrambleEventId = (await params).scrambleEventId;

  if (!scrambleEventId) {
    return <Loader />; // Show a loader until scrambleEventId is available
  }

  return (
    <>
      <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px] w-screen">
        <div className="w-full">
          <Box className="bg-[#F8F6F5] rounded-md p-4 w-full">
            <ScrambleEventLeaderboard scrambleEventId={scrambleEventId} />
          </Box>
        </div>
      </div>
    </>
  );
}
