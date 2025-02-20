import ScrambleEventEditForm from "@/components/Forms/ScrambleEventEditForm/ScrambleEventEditForm";
import ScrambleList from "@/components/ScrambleList/ScrambleList";
import { Button, Container } from "@mui/material";

export default async function ScrambleEventPage({
  params,
}: {
  params: Promise<{ scrambleEventId: string }>;
}) {
  const scrambleEventId = (await params).scrambleEventId;

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <ScrambleEventEditForm scrambleEventId={scrambleEventId} />
                <ScrambleList scrambleEventId={scrambleEventId} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
