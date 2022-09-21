import { AxiosRequestConfig } from "axios";
import { UserProfile } from "../../hooks/queries/auth";
import axiosInstance from "../axiosInstance";

interface UpdateUserProfileParams {
  token: string;
  newUsername: string;
}

export const updateUserProfile = async ({
  token,
  newUsername,
}: UpdateUserProfileParams): Promise<UserProfile> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance(config).put("/oauth/profile", {
      newName: newUsername,
    });
    return response.data;
  } catch (error) {
    throw new Error(`getUserData failed by ${error}`);
  }
};
