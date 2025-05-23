import { ScrambleLeaderboard } from "@/types/ScrambleLeaderboard";
import axios from "axios";

export const GetLeaderboard = async (scrambleId: string) => {
  const response = await axios.get<ScrambleLeaderboard[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/GetLeaderboard/" + scrambleId
  );
  return response;
};
