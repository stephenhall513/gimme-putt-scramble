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
            className="text-center text-black text-xl pb-6"
            style={{ fontFamily: "Russo One", fontSize: 24 }}
          >
            {scrambleTeam.scramble.scrambleName}
          </div>
          <div
            className="text-center text-xl"
            style={{ fontFamily: "Russo One" }}
          >
            {format(scrambleTeam.scramble.scrambleDate, "MM/dd/yyyy")}
          </div>
          <div
            className="text-center text-lg"
            style={{ fontFamily: "Russo One" }}
          >
            Shotgun Start:{" "}
            {formatDate(scrambleTeam.scramble.startTime, "h:mm a")}
          </div>
          <div
            className="text-center text-lg"
            style={{ fontFamily: "Russo One" }}
          >
            Starting Hole: {scrambleTeam.startingHole}
          </div>
          <div className="py-4">{scrambleTeam.scramble.description}</div>
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
          {sponsors ? <SponsorList sponsors={sponsors} /> : false}
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleOverview;
