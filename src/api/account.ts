import axios from "axios";
import { ChangePassword, Credentials, Registration } from "@/types/Account";

export const RegisterAccount = async (registration: Registration) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Account/RegisterGolfer",
    registration
  );
  return response;
};

export const LoginApi = async (credentials: Credentials) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Account/Login",
    credentials
  );

  return response;
};

export const UpdatePassword = async (changePassword: ChangePassword) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/account/updatepassword",
    changePassword
  );
  return response;
};

// export const UpdateAccount = async (golfer: IGolfer) => {

//     const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + '/account/update', golfer);
//     return response;
// };

export const CheckManager = async (golferId: string, leagueId: string) => {
  const response = await axios.get<boolean>(
    process.env.NEXT_PUBLIC_API_URL +
      "/account/ManagerCheck/" +
      golferId +
      "/" +
      leagueId
  );
  return response.data;
};

export const SendForgotPassword = async (email: string) => {
  const emailJson = {
    emailAddress: email,
  };

  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/Account/ResetPassword",
    emailJson
  );

  return response;
};

export const GetGolferByToken = async (token: string) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/Account/ResetPassword/" + token
  );

  return response;
};
