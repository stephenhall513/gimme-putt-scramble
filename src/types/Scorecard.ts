import { ScrambleScore } from "./Score";

export type Scorecard = {
  scrambleTeamId: string;
  teamName: string;
  front9Scores: ScrambleScore[];
  back9Scores: ScrambleScore[];
  front9Par: number;
  back9Par: number;
  front9Score: number;
  back9Score: number;
  totalPar: number;
  totalScore: number;
  overUnderScore: number;
};
