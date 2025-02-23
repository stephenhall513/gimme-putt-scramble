import { ScrambleScore } from "@/types/Score";
import axios from "axios";

export const AddScores = async (data: ScrambleScore) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/AddScore",
    data
  );
  return response;
};

export const GetScore = async (id: string) => {
  const response = await axios.get<ScrambleScore>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/GetScore/" + id
  );
  return response;
};

export const GetScrambleHoleInfo = async (
  scrambleTeamId: string,
  holeNumber: number
) => {
  const response = await axios.get<ScrambleScore>(
    process.env.NEXT_PUBLIC_API_URL +
      `/Scramble/HoleInfo/${scrambleTeamId}/${holeNumber}`
  );
  return response;
};
