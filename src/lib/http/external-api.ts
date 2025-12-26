import axios, { AxiosError, AxiosInstance } from "axios";
import { extractErrorMessage } from "../utils/error.utils";

const externalAPI: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL, // External api Or u can remove baseURL to use full URLs in requests,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
externalAPI.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
externalAPI.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    return Promise.reject(extractErrorMessage(error));
  },
);

export default externalAPI;
