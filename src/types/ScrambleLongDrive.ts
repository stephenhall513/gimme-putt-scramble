import { Hole } from "./Hole";

export type ScrambleLongDrive = {
  id?: string;
  scrambleId: string;
  holeId: string;
  golferName: string;
  hole?: Hole;
};

export type ScrambleLongDriveAdd = {
  scrambleId: string;
  holeNumber: number;
  golferName: string;
};

export type ScrambleLongDriveUpdate = {
  id: string;
  scrambleId: string;
  holeNumber: number;
  golferName: string;
};
