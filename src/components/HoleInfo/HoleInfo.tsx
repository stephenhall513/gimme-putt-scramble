import { GetHole } from "@/api/holes";
import { Hole } from "@/types/Hole";
import { HoleYardage } from "@/types/HoleYardage";
import { LeaderboardItem } from "@/types/LeaderboardItem";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HoleInfoProp {
  id: string;
}

const HoleInfo = ({ id }: HoleInfoProp) => {
  const [hole, setHole] = useState<Hole>();
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
    const getHoleInfo = async () => {
      const response = await GetHole(id);
      if (response.status == 200) {
        setHole(response.data);
      }
    };

    setIsLoading(true);
    getHoleInfo();
    setIsLoading(false);
  }, []);

  const getLeaderboard = async () => {
    setShowLeaderboard(true);
  };

  const viewScorecard = async () => {};

  return (
    <>
      <div
        style={{
          alignItems: "center",
          paddingTop: 0,
          width: "70%",
        }}
      >
        <a onClick={() => calculateYardage()}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                fontWeight: "600",
              }}
            >
              Hole # {hole?.holeNumber}
              {" | "}
              {hole?.yardage} yds
            </div>
            {hole ? (
              <Image
                src=""
                color={"#8cc63f"}
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                }}
                alt=""
              />
            ) : (
              false
            )}
          </div>
        </a>
        <div style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "600" }}>
          Par {hole?.par} {" | "} Handicap:{" "}
          {hole?.handicap}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              flex: 1,
              color: "#8cc63f",
              fontWeight: "600",
              marginTop: 5,
              marginBottom: 5,
              textAlign: "center",
            }}
            onClick={() => getLeaderboard()}
          >
            View Leaderboard
          </div>
          <div
            style={{
              flex: 1,
              color: "#8cc63f",
              fontWeight: "600",
              marginTop: 5,
              marginBottom: 5,
              textAlign: "center",
            }}
            onClick={() => viewScorecard()}
          >
            View Scorecard
          </div>
        </div>
      </div>
    </>
  );
};

export default HoleInfo;
