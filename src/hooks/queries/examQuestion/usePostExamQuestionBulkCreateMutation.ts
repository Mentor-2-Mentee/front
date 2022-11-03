import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import axiosInstance from "../../../api/axiosInstance";

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
    "/exam-question/bulk",
    params
  );
  return data;
};

export const usePostExamQuestionBulkCreateMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(postExamQuestionBulkCreate, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
