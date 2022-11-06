import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  body: {
    examReviewRoomId: number;
    targetUserId: string;
    newPosition: string;
  };
}

interface ApiResponse {
  message: string;
}

const updateUserPosition = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).put<ApiResponse>(
    "exam-review-room-user/position",
    params.body
  );
  return data;
};

export const useUpdateUserPositionMutation = (
  examReviewRoomId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateUserPosition, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "examReviewRoom",
        "userList",
        examReviewRoomId,
      ]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
