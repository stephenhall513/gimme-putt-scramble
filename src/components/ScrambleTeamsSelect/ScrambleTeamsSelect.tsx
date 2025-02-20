"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleTeam } from "@/types/Team";
import { Box, Link } from "@mui/material";
import useSWR from "swr";

interface ScrambleTeamsSelectProps {
  scrambleId: string;
  //   onEditClick: (id: string) => void;
  //   onTeamClick: (id: string) => void;
}

const ScrambleTeamsSelect = ({ scrambleId }: ScrambleTeamsSelectProps) => {
  const {
    data: scrambleTeams,
    error,
    mutate,
    isLoading,
  } = useSWR<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/scrambleteams/" + scrambleId,
    fetcher
  );

  return (
    <>
      <Box border={1} borderRadius={2} borderColor="#000000" padding={4}>
        {scrambleTeams?.map((scrambleTeam: ScrambleTeam) => {
          return (
            <Link
              key={scrambleTeam.id}
              href={"/scoring/" + scrambleTeam.id}
              color="primary"
              underline="none"
            >
              <div className="py-2 text-center">
                <div>{`${scrambleTeam.teamName} -  ${scrambleTeam.captainName}`}</div>
                <div>{`(Hole - ${scrambleTeam.startingHole})`}</div>
              </div>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default ScrambleTeamsSelect;
