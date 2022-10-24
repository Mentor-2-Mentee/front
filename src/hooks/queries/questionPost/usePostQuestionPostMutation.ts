import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { QuestionPost, QuestionPostForm } from ".";
import { NavigateFunction } from "react-router";

interface ApiParams {
  token?: string;
  questionPostForm: QuestionPostForm;
}

interface ApiResponse {
  message: string;
  questionPostId: string;
}

const postQuestionPost = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/question-post",
    params.questionPostForm
  );
  return data;
};

export const usePostQuestionPostMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  navigation: NavigateFunction
) =>
  useMutation(postQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      navigation(`/question/view?id=${data.questionPostId}`);
    },
  });
