import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { AxiosRequestConfig } from "axios";
import { UserProfile } from ".";

interface ApiParams {
  token?: string;
}

interface ApiResponse {
  message: string;
  userProfile: UserProfile;
}

const getUserProfile = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get("/user-profile");
  console.log(data);
  return data;
};

export const useGetUserProfileQuery = (params: ApiParams) =>
  useQuery(["userProfile"], () => getUserProfile(params), {
    enabled: Boolean(params.token),
  });
