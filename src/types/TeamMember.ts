import { ScrambleTeam } from "./Team";

export type ScrambleTeamMember = {
    id: string;
    scrambleTeamId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    golferId?: string;
    ScrambleTeam: ScrambleTeam;
}