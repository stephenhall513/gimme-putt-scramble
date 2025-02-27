import { Hole } from "./Hole";

export type ScrambleCTP = {
  id?: string;
  scrambleId: string;
  holeId: string;
  golferName: string;
  hole?: Hole;
};

export type ScrambleCTPAdd = {
  scrambleId: string;
  holeNumber: number;
  golferName: string;
};

export type ScrambleCTPUpdate = {
  id?: string;
  scrambleId: string;
  holeNumber: number;
  golferName: string;
};
