import { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";

export interface UserProfile {
  userId?: string;
  username?: string;
  userGrade?: string;
}

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance(config).get("/oauth/profile");

    return {
      userId: response.data.userId,
      username: response.data.username,
      userGrade: response.data.userGrade,
    };
  } catch (error) {
    throw new Error(`getUserData failed by ${error}`);
  }
};
