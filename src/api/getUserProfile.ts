import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export interface UserProfile {
  userId?: string;
  userName?: string;
}

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance(config).get("/profile");

    return {
      userId: response.data.userId,
      userName: response.data.username,
    };
  } catch (error) {
    throw new Error(`getUserData failed by ${error}`);
  }
};
