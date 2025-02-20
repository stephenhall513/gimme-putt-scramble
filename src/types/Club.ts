import { Course } from "./Course";

export type Club = {
  id: string;
  refId: string;
  clubName: string;
  city: string;
  state: string;
  country: string;
  address: string;
  timestampUpdated: Date;
  courses: Course[];
  numOfCourses: number;
};
