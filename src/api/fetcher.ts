import axios from "axios";
import { AxiosRequestConfig } from "axios";

// Define a generic function for fetching data with Axios
export const fetcher = <Data>(url: string, config?: AxiosRequestConfig) =>
  axios.get<Data>(url, config).then((res) => res.data);
