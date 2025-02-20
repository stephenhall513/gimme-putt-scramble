import { Hole } from "./Hole";

export type CourseFull = {
  id: string;
  refId: string;
  courseName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  hasCoordinates: boolean;
  numOfHoles: number;
  numOfTees: number;
  Holes: Hole[];
};

export type Course = {
  id: string;
  refId: string;
  courseName: string;
  numOfHoles: number;
};
