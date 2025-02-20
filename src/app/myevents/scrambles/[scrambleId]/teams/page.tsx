import ScrambleTeamsList from "@/components/ScrambleTeamsList/ScrambleTeamsList";
import { Container } from "@mui/material";

export default async function ScrambleTeamsPage() {
  //const scrambleId = (await params).scrambleId;

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <div
                  className="text-center text-xl pb-6"
                  style={{ fontFamily: "Russo One" }}
                >
                  Scramble Teams Page
                </div>
                {/* <ScrambleTeamsList scrambleId={scrambleId} /> */}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
