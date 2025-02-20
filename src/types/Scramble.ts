import { Course } from "./Course";

export type Scramble = {
  eventId: string;
  scrambleId?: string;
  scrambleCode: string;
  scrambleName: string;
  description: string;
  scrambleDate: Date;
  startTime: Date;
  courseId: string;
  teeBoxId: string;
  numOfHoles: number;
  scrambleLogo: string;
  course?: Course;
};
