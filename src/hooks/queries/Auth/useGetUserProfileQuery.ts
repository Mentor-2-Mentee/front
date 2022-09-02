import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { AxiosRequestConfig } from "axios";
import { userQueryClient } from ".";

interface UserProfile {
  userId?: string;
  username?: string;
  userGrade?: string;
}

const getUserProfile = (accessToken?: string): Promise<UserProfile> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return typeof accessToken === "undefined"
    ? Promise.reject(new Error("Invalid AccessToken"))
    : axiosInstance(config)
        .get("/oauth/profile")
        .then((response) => response.data);
};

export const useGetUserProfileQuery = (accessToken?: string) =>
  useQuery(["userProfile", accessToken], () => getUserProfile(accessToken), {
    enabled: Boolean(accessToken),
    onSuccess: () => {
      userQueryClient.invalidateQueries(["userProfile", accessToken]);
    },
  });
