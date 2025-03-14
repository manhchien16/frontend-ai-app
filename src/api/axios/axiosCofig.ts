import { BASE_API } from "@/share/constants/app";
import axios from "axios";

interface IInstance {
  [key: string]: {
    path: string | undefined;
    instance: any;
  };
}

const instance = axios.create({
  baseURL: BASE_API,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = "Bearer 123";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
