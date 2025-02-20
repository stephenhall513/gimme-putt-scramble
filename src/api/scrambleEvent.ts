import { ScrambleEvent } from "@/types/ScrambleEvent";
import axios from "axios";

export const CreateScrambleEvent = async (data: ScrambleEvent) => {
  const response = await axios.post<string>(
    process.env.NEXT_PUBLIC_API_URL + "/Event/CreateEvent",
    data
  );
  return response;
};

export const UpdateScrambleEvent = async (data: ScrambleEvent) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + "/Event/UpdateEvent",
    data
  );
  return response;
};

export const GetScrambleEvent = async (id: string) => {
  const response = await axios.get<ScrambleEvent>(
    process.env.NEXT_PUBLIC_API_URL + "/Event/ScrambleEvent/" + id
  );
  return response;
};

export const GetScrambleEvents = async (golferId: string) => {
  const response = await axios.get<ScrambleEvent[]>(
    process.env.NEXT_PUBLIC_API_URL + "/Event/ScrambleEvents/" + golferId
  );
  return response;
};
