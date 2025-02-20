import { Hole } from "./Hole";
import { ScrambleTeamMember } from "./TeamMember";

export type LongDrive = {
    id: string;
    scrambleId: string;
    scrambleTeamMemberId: string;
    holeId: string;
    ScrambleTeamMember: ScrambleTeamMember;
    Hole: Hole;
}