import ScoreEntry from "@/components/ScoreEntry/ScoreEntry";
import { Container } from "@mui/material";

export default async function ScoringPage({
  params,
}: {
  params: { scrambleTeamId: string };
}) {
  //const scrambleId = (await params).scrambleTeamId;

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div>
            <Container className="bg-[#F8F6F5] rounded-md">
              <ScoreEntry />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
