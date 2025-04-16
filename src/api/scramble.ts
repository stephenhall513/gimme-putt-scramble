import { Scorecard } from "@/types/Scorecard";
import { Scramble } from "@/types/Scramble";
import {
  ScrambleCTP,
  ScrambleCTPAdd,
  ScrambleCTPUpdate,
} from "@/types/ScrambleCTP";
import {
  ScrambleLongDrive,
  ScrambleLongDriveAdd,
  ScrambleLongDriveUpdate,
} from "@/types/ScrambleLongDrive";
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

export const ScrambleTeamEnd = async (id: string) => {
  const response = await axios.post<number>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/EndScrambleTeam/" + id
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

export const GetScrambleCTPs = async (scrambleId: string) => {
  const response = await axios.get<ScrambleCTP[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CTPs/" + scrambleId
  );
  return response;
};

export const GetScrambleCTP = async (scrambleCTPId: string) => {
  const response = await axios.get<ScrambleCTP>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CTP/" + scrambleCTPId
  );
  return response;
};

export const CreateScrambleCTP = async (data: ScrambleCTPAdd) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CTP",
    data
  );
  return response;
};

export const UpdateScrambleCTP = async (data: ScrambleCTPUpdate) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CTP",
    data
  );
  return response;
};

export const DeleteScrambleCTP = async (id: string) => {
  const response = await axios.delete<number>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/CTP/" + id
  );
  return response;
};

export const GetScrambleLongDrives = async (scrambleId: string) => {
  const response = await axios.get<ScrambleLongDrive[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/LongDrives/" + scrambleId
  );
  return response;
};

export const GetScrambleLongDrive = async (scrambleLongDriveId: string) => {
  const response = await axios.get<ScrambleCTP>(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/LongDrive/" +
      scrambleLongDriveId
  );
  return response;
};

export const CreateScrambleLongDrive = async (data: ScrambleLongDriveAdd) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/LongDrive",
    data
  );
  return response;
};

export const UpdateScrambleLongDrive = async (
  data: ScrambleLongDriveUpdate
) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/LongDrive",
    data
  );
  return response;
};

export const DeleteScrambleLongDrive = async (id: string) => {
  const response = await axios.delete<number>(
    process.env.NEXT_PUBLIC_API_URL + "/Scramble/LongDrive/" + id
  );
  return response;
};

export const MarkScrambleMessageRead = async (
  scrambleTeamId: string,
  messageId: string
) => {
  const response = await axios.post<number>(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/MarkScrambleMessageRead/" +
      scrambleTeamId +
      "/" +
      messageId
  );
  return response;
};

export const MarkAllScrambleMessageRead = async (scrambleTeamId: string) => {
  const response = await axios.post<number>(
    process.env.NEXT_PUBLIC_API_URL +
      "/Scramble/MarkAllScrambleMessageRead/" +
      scrambleTeamId
  );
  return response;
};
