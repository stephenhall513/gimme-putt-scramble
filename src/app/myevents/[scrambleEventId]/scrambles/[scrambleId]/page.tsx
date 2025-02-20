import { Button, Container } from "@mui/material";

export default async function ScrambleDetailPage({
  params,
}: {
  params: Promise<{ scrambleId: string }>;
}) {
  const scrambleId = (await params).scrambleId;

  return (
    <>
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                {scrambleId}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
