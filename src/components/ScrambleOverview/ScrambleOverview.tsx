"use client";
import { useEffect, useState } from "react";
import { GetScrambleSponsors, GetScrambleTeam } from "@/api/scramble";
import { format, formatDate } from "date-fns";
import { ScrambleTeam } from "@/types/Team";
import { Button } from "@mui/material";
import SponsorList from "../SponsorList/SponsorList";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";

interface ScrambleOverviewProps {
  scrambleTeamId: string;
}

const ScrambleOverview = ({ scrambleTeamId }: ScrambleOverviewProps) => {
  const [scrambleTeam, setScrambleTeam] = useState<ScrambleTeam>();
  const [sponsors, setSponsors] = useState<ScrambleSponsor[]>();

  useEffect(() => {
    const getScrambleTeam = async () => {
      const response = await GetScrambleTeam(scrambleTeamId);
      if (response.status == 200) {
        const data = await response.data;
        setScrambleTeam(data);

        const sponsorResponse = await GetScrambleSponsors(data.scrambleId);

        if (sponsorResponse.status == 200) {
          setSponsors(sponsorResponse.data);
        }
      }
    };

    getScrambleTeam();
  }, []);

  return (
    <>
      {scrambleTeam ? (
        <div>
          <div
            className="text-center text-black text-xl pb-3"
            style={{ fontFamily: "Russo One", fontSize: 24 }}
          >
            {scrambleTeam.scramble.scrambleName}
          </div>
          <div
            className="text-center text-md"
            style={{ fontFamily: "Russo One" }}
          >
            {format(scrambleTeam.scramble.scrambleDate, "MM/dd/yyyy")}
          </div>
          <div
            className="text-center text-md mb-6"
            style={{ fontFamily: "Russo One" }}
          >
            Shotgun Start:{" "}
            {formatDate(scrambleTeam.scramble.startTime, "h:mm a")}
          </div>
          <div className="text-center text-lg font-bold">
            Welcome,{" "}
            {scrambleTeam.captainName ? scrambleTeam.captainName : "Guest"}!
          </div>

          <div className="text-center text-lg">
            You will be starting on Hole #{scrambleTeam.startingHole}
          </div>
          <div className="py-4 text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: scrambleTeam.scramble.description,
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              href={"/scoring/" + scrambleTeamId}
            >
              Start Scramble
            </Button>
          </div>
          <div className="pt-4 text-md text-left font-bold">Rules:</div>
          <div className="py-2 text-sm text-left">
            <div
              dangerouslySetInnerHTML={{ __html: scrambleTeam.scramble.rules }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              href={"/scoring/" + scrambleTeamId}
            >
              Start Scramble
            </Button>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleOverview;
