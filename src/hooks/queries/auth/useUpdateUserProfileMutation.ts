import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { authQueryClient, UserProfile } from ".";
import axiosInstance from "../../../api/axiosInstance";

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
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  token?: string
) =>
  useMutation(updateUserProfile, {
    onSuccess: (data) => {
      authQueryClient.invalidateQueries(["userProfile"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
