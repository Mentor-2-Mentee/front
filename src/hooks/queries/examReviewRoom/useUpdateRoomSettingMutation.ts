import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  body: {
    examReviewRoomId: number;
    enterCode?: string;
    isRestricted?: boolean;
    isArchived?: boolean;
  };
}

interface ApiResponse {
  message: string;
}

const updateRoomSetting = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).put<ApiResponse>(
    "/exam-review-room",
    params.body
  );
  return data;
};

export const useUpdateRoomSettingMutation = (
  examReviewRoomId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateRoomSetting, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examReviewRoom", examReviewRoomId]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
