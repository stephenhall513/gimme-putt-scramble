import ScrambleEventEditForm from "@/components/Forms/ScrambleEventEditForm/ScrambleEventEditForm";
import Loader from "@/components/Loader";
import ScrambleList from "@/components/ScrambleList/ScrambleList";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function ScrambleEventPage({
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
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Breadcrumbs aria-label="breadcrumb" className="py-4">
                <Link className="text-[#7DB534]" href="/myevents">
                  My Events
                </Link>
                <Typography sx={{ color: "#FFFFFF" }}>Event</Typography>
              </Breadcrumbs>
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <>
                  <ScrambleEventEditForm scrambleEventId={scrambleEventId} />
                  <ScrambleList scrambleEventId={scrambleEventId} />
                </>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
