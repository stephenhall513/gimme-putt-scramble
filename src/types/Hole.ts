import { Coordinates } from "@/components/MapboxComponent/MapboxComponent";
import { TeeBox } from "./TeeBox";
import { HoleCoordinate } from "./HoleCoordinate";

export type Hole = {
  id: string;
  teeBoxId: string;
  holeNumber: number;
  par: number;
  parWomen: number;
  yardage: number;
  handicap: number;
  handicapWomen: number;
  handicap9: number;
  hasCoordinated: boolean;
  teeBox: TeeBox;
  coordinates: HoleCoordinate[];
};
