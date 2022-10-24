import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router";
import { QuestionPost, questionPostQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  questionPostId: number;
}

interface ApiResponse {
  message: string;
}

const deleteQuestionPost = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/question-post?questionPostId=${params.questionPostId}`
  );
  return data;
};

export const useDeleteQuestionPostMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  navigation: NavigateFunction
) =>
  useMutation(deleteQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      questionPostQueryClient.invalidateQueries(["questionPost"]);
      navigation(`/question/list`, { replace: true });
    },
  });
