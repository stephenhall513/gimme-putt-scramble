import { Hole } from "./Hole";
import { HoleCoordinate } from "./HoleCoordinate";
import { ScrambleSponsor } from "./ScrambleSponsor";

export type ScrambleScore = {
  scrambleScoreId?: string;
  scrambleTeamId: string;
  holeId: string;
  strokes: number;
  hole?: Hole;
  coordinates?: HoleCoordinate[];
  sponsors?: ScrambleSponsor[];
  gameType?: string;
};
