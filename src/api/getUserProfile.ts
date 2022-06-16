import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export const getUserProfile = async (token: string): Promise<void> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance(config).get("/profile");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getUserData failed by ${error}`);
  }
};
