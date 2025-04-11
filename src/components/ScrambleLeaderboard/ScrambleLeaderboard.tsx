"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleLeaderboard } from "@/types/ScrambleLeaderboard";
import { Box, Grid2 } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useSWR from "swr";

interface LeaderboardProp {
  scrambleId: string;
}

const Leaderboard = ({ scrambleId }: LeaderboardProp) => {
  const { data, error } = useSWR<ScrambleLeaderboard[]>(
    process.env.NEXT_PUBLIC_API_URL + "/scramble/getleaderboard/" + scrambleId,
    fetcher,
    { refreshInterval: 10000 }
  );

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 36,
    page: 0,
  });

  function getRowId(row: ScrambleLeaderboard) {
    return row.scrambleTeamId;
  }

  return (
    <table className="border-collapse border border-gray-300 w-[525px]">
      <thead>
        <tr className="bg-gray-100 text-xs">
          <th className="border border-gray-300 p-2 bg-gray"></th>
          <th className="border border-gray-300 p-2 bg-gray w-[175px]">Team</th>
          <th className="border border-gray-300 p-2 bg-gray">+/-</th>
          <th className="border border-gray-300 p-2 bg-gray">Thru</th>
          <th className="border border-gray-300 p-2 bg-gray text-wrap">
            Holes Played
          </th>
        </tr>
      </thead>
      <tbody className="bg-white  text-xs">
        {data?.map((team, index) => {
          return (
            <tr key={team.scrambleTeamId}>
              <td className="border border-gray-300 p-2 text-center">
                {team.rank}
              </td>
              <td className="border border-gray-300 p-2">{team.teamName}</td>
              <td className="border border-gray-300 p-2 text-center">
                {team.score == 0
                  ? "E"
                  : team.score > 0
                    ? "+" + team.score
                    : team.score}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {team.currentHole}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {team.holesPlayed}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Leaderboard;
