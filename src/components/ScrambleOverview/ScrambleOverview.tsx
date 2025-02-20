"use client";
import { useEffect, useState } from "react";
import { GetScrambleTeam } from "@/api/scramble";
import { format, formatDate } from "date-fns";
import { ScrambleTeam } from "@/types/Team";
import { Button } from "@mui/material";

interface ScrambleOverviewProps {
  scrambleTeamId: string;
}

const ScrambleOverview = ({ scrambleTeamId }: ScrambleOverviewProps) => {
  const [scrambleTeam, setScrambleTeam] = useState<ScrambleTeam>();

  useEffect(() => {
    const getScrambleTeam = async () => {
      const response = await GetScrambleTeam(scrambleTeamId);
      if (response.status == 200) {
        const data = await response.data;
        console.log("Overview", response.data);
        setScrambleTeam(data);
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
          <Button
            variant="contained"
            color="primary"
            size="medium"
            href={"/scoring/" + scrambleTeamId}
          >
            Start Scramble
          </Button>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleOverview;
