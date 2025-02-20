import ScrambleOverview from "@/components/ScrambleOverview/ScrambleOverview";
import ScrambleTeamsSelect from "@/components/ScrambleTeamsSelect/ScrambleTeamsSelect";
import { Container } from "@mui/material";

export default async function ScramblePage({
  params,
}: {
  params: Promise<{ scrambleId: string }>;
}) {
  const scrambleId = (await params).scrambleId;

  {
    /* Course Name */
  }
  {
    /* Course Overview */
  }
  {
    /* Course Main Sponsor */
  }
  {
    /* List of Teams - When a person clicks on the team. 
        It goes to the team page with list of members. 
        Starting Hole Number.
        Team has to confirm to start the round.
        On confirmation, the ScrambleTeamId is saved as a cookie and the status in the database is changed to "In Progress".
        What to do if scoring is switched to another user?
        - Does a user have to explain why they are choosing to start over?
        - Does it even matter why?
        */
  }

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <ScrambleOverview scrambleId={scrambleId} />
                <div className="text-center">Please Click On Your Team</div>
                <ScrambleTeamsSelect scrambleId={scrambleId} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
