import { Scorecard } from "@/types/Scorecard";
import { Scramble } from "@/types/Scramble";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import { ScrambleTeam, ScrambleTeamCreate } from "@/types/Team";
import axios from "axios";

export const CreateScramble = async (data: Scramble) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CreateScramble",
    data
  );
  return response;
};

export const UpdateScramble = async (data: Scramble) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/UpdateScramble",
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

export const CheckScrambleEmail = async (email: string) => {
  const response = await axios.get<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/CheckScrambleEmail?email=" +
      email
  );
  return response;
};

export const GetScrambleTeams = async (id: string) => {
  const response = await axios.get<ScrambleTeam[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/ScrambleTeams/" + id
  );
  return response;
};

export const GetScrambleTeam = async (id: string) => {
  const response = await axios.get<ScrambleTeam>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/ScrambleTeam/" + id
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
  const response = await axios.delete<number>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/DeleteScrambleTeam/" + id
  );
  return response;
};

export const CreateScrambleSponsor = async (data: ScrambleSponsor) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CreateSponsor",
    data
  );
  return response;
};

export const DeleteScrambleSponsor = async (id: string) => {
  const response = await axios.delete<number>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/DeleteScrambleSponsor/" + id
  );
  return response;
};

export const UploadScrambleLogo = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Append the file.

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/UploadSponsorLogo/" + id,
    formData
  );
  return response;
};

export const GetScrambleSponsors = async (id: string) => {
  const response = await axios.get<ScrambleSponsor[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/ScrambleSponsors/" + id
  );
  return response;
};

export const GetScrambleScorecard = async (scrambleTeamId: string) => {
  const response = await axios.get<Scorecard>(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/ScrambleScorecard/" +
      scrambleTeamId
  );
  return response;
};
