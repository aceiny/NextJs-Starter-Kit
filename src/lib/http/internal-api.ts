// lib/internalAPI.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { extractErrorMessage } from "../utils/error.utils";

const internalAPI: AxiosInstance = axios.create({
  baseURL: "/api", // This goes through rewrites → BACKEND
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
internalAPI.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
internalAPI.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    return Promise.reject(extractErrorMessage(error));
  },
);

export default internalAPI;
