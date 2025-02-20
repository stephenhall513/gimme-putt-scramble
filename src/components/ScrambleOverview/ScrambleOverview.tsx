"use client";
import { useEffect, useState } from "react";
import { GetScramble } from "@/api/scramble";
import { Scramble } from "@/types/Scramble";
import { format, formatDate } from "date-fns";

interface ScrambleOverviewProps {
  scrambleId: string;
}

const ScrambleOverview = ({ scrambleId }: ScrambleOverviewProps) => {
  const [scrambleData, setScrambleData] = useState<Scramble | null>(null);

  useEffect(() => {
    const getScrambleData = async () => {
      const response = await GetScramble(scrambleId);
      if (response.status == 200) {
        const data = await response.data;
        setScrambleData(data);
      }
    };

    getScrambleData();
  }, []);

  return (
    <>
      {scrambleData ? (
        <div>
          <div
            className="text-center text-black text-xl pb-6"
            style={{ fontFamily: "Russo One", fontSize: 24 }}
          >
            {scrambleData.scrambleName}
          </div>
          <div
            className="text-center text-xl"
            style={{ fontFamily: "Russo One" }}
          >
            {formatDate(scrambleData.scrambleDate, "MM/dd/yyyy")}
          </div>
          <div
            className="text-center text-lg"
            style={{ fontFamily: "Russo One" }}
          >
            Shotgun Start: {formatDate(scrambleData.startTime, "h:mm a")}
          </div>
          <div className="py-4">{scrambleData.description}</div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleOverview;
