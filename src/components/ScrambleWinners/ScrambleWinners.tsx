import ScrambleCTP from "../ScrambleCTPWinners/ScrambleCTPWinners";
import ScrambleLongDrive from "../ScrambleLongDriveWinners/ScrambleLongDriveWinners";

interface ScrambleWinnersProps {
  scrambleId: string;
}

const ScrambleWinners = ({ scrambleId }: ScrambleWinnersProps) => {
  return (
    <>
      <div>
        <div
          className="text-center text-xl"
          style={{ fontFamily: "Russo One" }}
        >
          Winners:
        </div>
        <div className="flex flex-row justify-center p-3">
          <ScrambleLongDrive scrambleId={scrambleId} />
          <ScrambleCTP scrambleId={scrambleId} />
        </div>
      </div>
    </>
  );
};

export default ScrambleWinners;
