import ScrambleTeamsList from "@/components/ScrambleTeamsList/ScrambleTeamsList";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function ScrambleTeamsPage({
  params,
}: {
  params: Promise<{ scrambleEventId: string; scrambleId: string }>;
}) {
  const scrambleEventId = (await params).scrambleEventId;
  const scrambleId = (await params).scrambleId;

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Breadcrumbs aria-label="breadcrumb" className="py-4">
                <Link className="text-[#7DB534]" href="/myevents">
                  My Events
                </Link>
                <Link
                  className="text-[#7DB534]"
                  href={"/myevents/events/" + scrambleEventId}
                >
                  Event
                </Link>
                <Typography sx={{ color: "#FFFFFF" }}>Manage Teams</Typography>
              </Breadcrumbs>
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <ScrambleTeamsList scrambleId={scrambleId} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
