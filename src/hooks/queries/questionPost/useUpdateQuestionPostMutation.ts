import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router";
import { QuestionPost, questionPostQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  postForm: Pick<QuestionPost, "id" | "title" | "description">;
}

interface ApiResponse {
  message: string;
  questionPostId: number;
}

const updateQuestionPost = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).put<ApiResponse>(
    "/question-post",
    params.postForm
  );
  return data;
};

export const useUpdateQuestionPostMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  navigation: NavigateFunction
) =>
  useMutation(updateQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      questionPostQueryClient.invalidateQueries(["questionPost"]);
      navigation(`/question/view?id=${data.questionPostId}`, { replace: true });
    },
  });
