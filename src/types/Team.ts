import { Scramble } from "./Scramble";

export type ScrambleTeam = {
  id: string;
  scrambleId: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  startingHole: number;
  currentHole: number;
  score: number;
  par: number;
  status: string;
  holesPlayed: number;
  scramble: Scramble;
};

export type ScrambleTeamCreate = {
  scrambleId: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  startingHole: number;
  status: string;
};
