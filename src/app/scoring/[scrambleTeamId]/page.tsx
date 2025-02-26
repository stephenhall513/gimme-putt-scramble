import ScoreEntry from "@/components/ScoreEntry/ScoreEntry";
import { AppBar, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default async function ScoringPage({
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
            <ScoreEntry scrambleTeamId={scrambleTeamId} />
          </Container>
        </div>
      </div>
    </>
  );
}
