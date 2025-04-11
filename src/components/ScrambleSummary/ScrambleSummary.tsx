"use client";
import { GetScrambleScorecard, GetScrambleTeam } from "@/api/scramble";
import { ScrambleTeam } from "@/types/Team";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Scorecard } from "@/types/Scorecard";
import { get } from "http";
import { Button, ButtonGroup, Card, CardContent } from "@mui/material";
import ScrambleScorecard from "../ScrambleScorecard/ScrambleScorecard";
import Leaderboard from "../ScrambleLeaderboard/ScrambleLeaderboard";

interface ScrambleSummaryProps {
  scrambleTeamId: string;
}

const ScrambleSummary = ({ scrambleTeamId }: ScrambleSummaryProps) => {
  const [scrambleTeam, setScrambleTeam] = useState<ScrambleTeam>();
  const [scorecard, setScorecard] = useState<Scorecard>();
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showScorecard, setShowScorecard] = useState<boolean>(true);

  useEffect(() => {
    const getScorecard = async () => {
      const response = await GetScrambleScorecard(scrambleTeamId);
      console.log("Scorecard", response);
      if (response.status == 200) {
        setScorecard(response.data);
      }
    };

    const getTeam = async () => {
      const response = await GetScrambleTeam(scrambleTeamId);
      console.log("ScrambleTeam", response);
      if (response.status == 200) {
        setScrambleTeam(response.data);
      }
    };

    getScorecard();
    getTeam();
  }, [scrambleTeamId]);

  const viewLeaderboard = async () => {
    if (showLeaderboard) {
      setShowScorecard(false);
    } else {
      setShowLeaderboard(true);
      setShowScorecard(false);
    }
  };

  const viewScorecard = async () => {
    if (showScorecard) {
      setShowLeaderboard(false);
    } else {
      setShowScorecard(true);
      setShowLeaderboard(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {scrambleTeam?.scramble.scrambleLogo ? (
        <Image
          src={scrambleTeam.scramble.scrambleLogo}
          alt={scrambleTeam?.scramble.scrambleName}
          height={100}
          width={100}
        />
      ) : (
        <div className="text-2xl text-center font-bold text-black mb-2">
          {scrambleTeam?.scramble.scrambleName}
        </div>
      )}
      <div className="py-4">
        {scrambleTeam ? (
          <div
            dangerouslySetInnerHTML={{
              __html: scrambleTeam?.scramble.endMessage,
            }}
          />
        ) : (
          false
        )}
      </div>
      <div className="flex justify-center">
        <ButtonGroup>
          <Button
            variant="contained"
            size="small"
            color={showScorecard ? "primary" : "secondary"}
            onClick={() => viewScorecard()}
            style={{ fontSize: "8pt" }}
          >
            Scorecard
          </Button>
          <Button
            variant="contained"
            size="small"
            color={showLeaderboard ? "primary" : "secondary"}
            style={{ fontSize: "8pt" }}
            onClick={() => viewLeaderboard()}
          >
            Leaderboard
          </Button>
        </ButtonGroup>
      </div>
      {showScorecard && scorecard ? (
        <Card className="p-2 max-w-4xl mx-auto mt-5 w-full">
          <CardContent className="overflow-x-auto">
            <ScrambleScorecard scorecard={scorecard} />
          </CardContent>
        </Card>
      ) : (
        false
      )}
      {showLeaderboard && scrambleTeam ? (
        <Card className="p-6 max-w-4xl mx-auto mt-5 w-full">
          <CardContent className="overflow-x-auto">
            <Leaderboard scrambleId={scrambleTeam?.scrambleId} />
          </CardContent>
        </Card>
      ) : (
        false
      )}
    </div>
  );
};

export default ScrambleSummary;
