import { Scramble } from "@/types/Scramble";
import { ScrambleTeam, ScrambleTeamCreate } from "@/types/Team";
import axios from "axios";

export const CreateScramble = async (data: Scramble) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CreateScramble",
    data
  );
  return response;
};

export const GetScramble = async (id: string) => {
  const response = await axios.get<Scramble>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/GetScramble/" + id
  );
  return response;
};

export const GetScrambles = async (id: string) => {
  const response = await axios.get<Scramble[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/GetScrambles/" + id
  );
  return response;
};

export const CheckScrambleCode = async (id: string) => {
  const response = await axios.get<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CheckScrambleCode?code=" + id
  );
  return response;
};

export const GetScrambleTeams = async (id: string) => {
  const response = await axios.get<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/ScrambleTeams/" + id
  );
  return response;
};

export const UploadScrambleTeams = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Append the file.

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/UploadScrambleTeams?scrambleId=" +
      id,
    formData
  );
  return response;
};

export const CreateScrambleTeam = async (data: ScrambleTeamCreate) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CreateScrambleTeam",
    data
  );
  return response;
};

export const DeleteScrambleTeam = async (id: string) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CreateScrambleTeam"
  );
  return response;
};
