import { Hole } from "./Hole";
import { HoleCoordinate } from "./HoleCoordinate";

export type ScrambleScore = {
  scrambleScoreId?: string;
  scrambleTeamId: string;
  holeId: string;
  strokes: number;
  hole?: Hole;
  coordinates?: HoleCoordinate[];
};
