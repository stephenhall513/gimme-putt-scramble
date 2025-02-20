import { TeeBox } from "./TeeBox";

export type Hole = {
    id: string;
    teeBoxId: string;
    holeNumber: string;
    par: number;
    parWomen: number;
    yardage: number;
    handicap: number;
    handicapWomen: number;
    handicap9: number;
    TeeBox: TeeBox;
}