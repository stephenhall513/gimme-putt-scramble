import ScoreEntry from "@/components/ScoreEntry/ScoreEntry";
import { Container } from "@mui/material";

export default async function ScoringPage({
  params,
}: {
  params: Promise<{ scrambleTeamId: string }>;
}) {
  const scrambleTeamId = (await params).scrambleTeamId;
  console.log("scrambleTeamId-page", scrambleTeamId);

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div>
            <Container className="bg-[#F8F6F5] rounded-md">
              <ScoreEntry scrambleTeamId={scrambleTeamId} />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
