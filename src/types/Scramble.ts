import { Course } from "./Course";

export type Scramble = {
  eventId: string;
  id?: string;
  scrambleCode: string;
  scrambleName: string;
  description: string;
  rules: string;
  endMessage: string;
  scrambleDate: Date;
  startTime: Date;
  courseId: string;
  teeBoxId: string;
  numOfHoles: number;
  scrambleLogo: string;
  course?: Course;
};
