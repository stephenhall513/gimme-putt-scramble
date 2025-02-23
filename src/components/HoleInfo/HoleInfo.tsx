import { Hole } from "@/types/Hole";
import { HoleYardage } from "@/types/HoleYardage";
import { LeaderboardItem } from "@/types/LeaderboardItem";
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HoleInfoProp {
  hole: Hole;
}

const HoleInfo = ({ hole }: HoleInfoProp) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [yardage, setYardage] = useState<HoleYardage>();
  const [yardageModalVisible, setYardageModalVisible] =
    useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const calculateYardage = async () => {};

  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);
  }, []);

  const getLeaderboard = async () => {
    setShowLeaderboard(true);
  };

  const viewScorecard = async () => {};

  return (
    <>
      <div
        className="pt-0 w-full align-middle"
        style={{ fontFamily: "Russo One" }}
      >
        <a onClick={() => calculateYardage()}>
          <div className="flex flex-row justify-center">
            <div className="text-black text-lg font-medium">
              Hole # {hole?.holeNumber}
              {" | "}
              {hole?.yardage} yds
            </div>
          </div>
        </a>
        <div className="text-black text-center">
          Par {hole?.par} {" | "} Handicap: {hole?.handicap}
        </div>
        <div className="flex flex-row justify-evenly">
          <Button
            variant="text"
            size="small"
            className="flex-1 color-[#8cc63f] text-xs my-5 text-center"
            onClick={() => getLeaderboard()}
          >
            Leaderboard
          </Button>
          <Button
            variant="text"
            size="small"
            className="flex-1 color-[#8cc63f] text-xs my-5 text-center"
            onClick={() => viewScorecard()}
          >
            Scorecard
          </Button>
        </div>
      </div>
    </>
  );
};

export default HoleInfo;
