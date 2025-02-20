"use client";
import ScrambleCode from "@/components/Forms/ScrambleCode/ScrambleCode";
import ScrambleEntry from "@/components/Forms/ScrambleEntry/ScrambleEntry";
import ScrambleTeamsSelect from "@/components/ScrambleTeamsSelect/ScrambleTeamsSelect";
import { ScrambleTeam } from "@/types/Team";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div>
      <div
        className="text-center text-white text-xl pb-6"
        style={{ fontFamily: "Russo One" }}
      >
        Welcome to Gimme Putt Scramble!
      </div>
      <Container className="bg-[#F8F6F5] rounded-md p-4">
        <ScrambleEntry />
        <div className="text-center text-black pb-4 text-sm">
          <Link href="/info" title="Interested in Setting Up a Scramble?">
            Interested in Setting Up a Scramble?{" "}
            <span className="underline">Click Here</span>
          </Link>
        </div>
        <div className="text-center text-black pb-4 text-sm">
          <Link href="/login" title="Interested in Setting Up a Scramble?">
            Event Organizers <span className="underline">Click Here</span> to
            Sign In
          </Link>
        </div>
      </Container>
    </div>
  );
}
