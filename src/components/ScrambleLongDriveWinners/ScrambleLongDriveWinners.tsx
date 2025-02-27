import { fetcher } from "@/api/fetcher";
import { GetScrambleLongDrives } from "@/api/scramble";
import { ScrambleLongDrive } from "@/types/ScrambleLongDrive";
import { useEffect } from "react";
import useSWR from "swr";

interface ScrambleLongDriveWinnersProps {
  scrambleId: string;
}

const ScrambleLongDriveWinners = ({
  scrambleId,
}: ScrambleLongDriveWinnersProps) => {
  const {
    data: longDrives,
    error,
    isLoading,
  } = useSWR<ScrambleLongDrive[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/longdrives/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <>
      {longDrives ? (
        <div className="flex-1">
          <div className="text-lg" style={{ fontFamily: "Russo One" }}>
            Long Drive
          </div>
          {longDrives.map((longDrive) => (
            <div key={longDrive.id}>
              Hole # {longDrive.hole?.holeNumber}: {longDrive.golferName}
            </div>
          ))}
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleLongDriveWinners;
