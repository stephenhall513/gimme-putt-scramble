import { Container } from "@mui/material";

import ScrambleSummary from "@/components/ScrambleSummary/ScrambleSummary";

export default async function ScrambleSummaryPage({
  params,
}: {
  params: Promise<{ scrambleTeamId: string }>;
}) {
  const scrambleTeamId = (await params).scrambleTeamId;

  return (
    <>
      <div>
        <div className="py-[10px] h- h-auto w-svw px-[20px] mb-10">
          <Container className="bg-[#F8F6F5] rounded-md h-full pt-5 pb-[20px]">
            <ScrambleSummary scrambleTeamId={scrambleTeamId} />
          </Container>
        </div>
      </div>
    </>
  );
}
