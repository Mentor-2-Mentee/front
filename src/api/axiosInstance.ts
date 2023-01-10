import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const createInstance = axios.create({
    baseURL: `${import.meta.env["VITE_APP_BASEURL"]}`,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  });

  return createInstance;
};

export default axiosInstance;
