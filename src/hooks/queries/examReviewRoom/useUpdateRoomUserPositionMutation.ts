import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  targetUserId: string;
  applyPosition: string;
}

interface ApiResponse {
  message: string;
}

const updateRoomUserPosition = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).put<ApiResponse>(
    "exam-review-room/user-position",
    { targetUserId: params.targetUserId, applyPosition: params.applyPosition }
  );
  return data;
};

export const useUpdateRoomUserPositionMutation = (
  examReviewRoomId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateRoomUserPosition, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "examReviewRoom",
        "userList",
        examReviewRoomId,
      ]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
