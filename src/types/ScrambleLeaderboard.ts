import { Scramble } from "./Scramble";

export type ScrambleLeaderboard = {
  scrambleTeamId: string;
  rank: string;
  scrambleId: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  startingHole: number;
  currentHole: number;
  grossScore: number;
  score: number;
  par: number;
  status: string;
  holesPlayed: number;
  scramble: Scramble;
};
