import { Hole } from "@/types/Hole";
import axios from "axios";

export const GetHole = async (id: String) => {
    const response = await axios.get<Hole>(
      process.env.NEXT_PUBLIC_API_URL + "/Hole/GetScore/" + id
    );
    return response;
  };