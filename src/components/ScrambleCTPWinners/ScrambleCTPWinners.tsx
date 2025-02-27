import { fetcher } from "@/api/fetcher";
import { ScrambleLongDrive } from "@/types/ScrambleLongDrive";
import useSWR from "swr";

interface ScrambleCTPWinnersProps {
  scrambleId: string;
}

const ScrambleCTPWinners = ({ scrambleId }: ScrambleCTPWinnersProps) => {
  const {
    data: ctps,
    error,
    isLoading,
  } = useSWR<ScrambleLongDrive[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/ctps/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <>
      {ctps ? (
        <div className="flex-1">
          <div className="text-lg" style={{ fontFamily: "Russo One" }}>
            Closest To Pin
          </div>
          {ctps.map((ctp) => (
            <div key={ctp.id}>
              Hole # {ctp.hole?.holeNumber}: {ctp.golferName}
            </div>
          ))}
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleCTPWinners;
