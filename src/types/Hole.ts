import { Coordinates } from "@/components/MapboxComponent/MapboxComponent";
import { TeeBox } from "./TeeBox";

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
  coordinates: Coordinates;
};
