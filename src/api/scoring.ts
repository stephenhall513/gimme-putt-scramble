import { ScrambleScore } from "@/types/Score";
import axios from "axios";

export const AddScores = async (data: ScrambleScore) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/AddScore",
    data
  );
  return response;
};

export const GetScore = async (id: String) => {
  const response = await axios.get<ScrambleScore>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/GetScore/" + id
  );
  return response;
};
