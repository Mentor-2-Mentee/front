import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  examReviewRoomId: number;
}

interface ApiResponse {
  message: string;
}

const deleteExamReviewRoom = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/exam-review-room?examReviewRoomId=${params.examReviewRoomId}`
  );

  return data;
};

export const useDeleteExamReviewRoomMutation = (
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(deleteExamReviewRoom, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examReviewRoom"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
