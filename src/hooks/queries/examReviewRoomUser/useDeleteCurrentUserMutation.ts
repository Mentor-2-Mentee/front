import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token?: string;
  examReviewRoomId: number;
  targetUserId: string;
}

interface ApiResponse {
  message: string;
}

const deleteCurrentUserMutation = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `exam-review-room-user?examReviewRoomId=${params.examReviewRoomId}&targetUserId=${params.targetUserId}`
  );
  return data;
};

export const useDeleteCurrentUserMutation = (
  examReviewRoomId: number,
  enqueueSnackbar: EnqueueSnackbar,
  navigation?: NavigateFunction
) =>
  useMutation(deleteCurrentUserMutation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "examReviewRoom",
        "userList",
        examReviewRoomId,
      ]);
      enqueueSnackbar(data.message, {
        variant: "warning",
      });
      if (navigation) navigation("/main");
    },
  });
