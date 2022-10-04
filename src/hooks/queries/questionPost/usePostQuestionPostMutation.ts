import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import { QuestionForm } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

interface ApiParams {
  token?: string;
  questionForm: QuestionForm;
}

interface ApiResponse {
  message: string;
  path: string;
}

const postQuestionPost = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/question-post",
    params
  );
  return data;
};

export const usePostQuestionPostMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(postQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
