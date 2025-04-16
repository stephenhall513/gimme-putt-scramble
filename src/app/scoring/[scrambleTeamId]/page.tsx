import ScoreEntry from "@/components/ScoreEntry/ScoreEntry";
import { AppBar, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Sponsor from "@/components/Sponsor/Sponsor";
import HoleSponsor from "@/components/HoleSponsor/HoleSponsor";
import ScrambleMessages from "@/components/ScrambleMessage/ScrambleMessageList";
import ScrambleMessageButton from "@/components/ScrambleMessage/ScrambleMessageButton";

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
            <ScrambleMessageButton scrambleTeamId={scrambleTeamId} />
            <ScoreEntry scrambleTeamId={scrambleTeamId} />
          </Container>
        </div>
      </div>
    </>
  );
}
