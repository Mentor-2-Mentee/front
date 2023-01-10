import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import { UserProfile } from ".";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";
import { EnqueueSnackbar } from "../../../models/types";

interface ApiParams {
  token: string;
  newName: string;
}

interface ApiResponse {
  message: string;
  userProfile: UserProfile;
}

const updateUserProfile = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).put("user-profile", params);
  return data;
};

export const useUpdateUserProfileMutation = (
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateUserProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userProfile"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
