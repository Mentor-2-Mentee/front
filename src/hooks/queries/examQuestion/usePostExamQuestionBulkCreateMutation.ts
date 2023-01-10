import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  examReviewRoomId: number;
  examQuestionCount: number;
}

interface ApiResponse {
  message: string;
  isCreate: boolean;
}

const postExamQuestionBulkCreate = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-question/set-question-count",
    params
  );
  return data;
};

export const usePostExamQuestionBulkCreateMutation = (
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(postExamQuestionBulkCreate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examQuestion"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
