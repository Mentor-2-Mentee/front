import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router";
import { QuestionPost } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: EnqueueSnackbar,
  navigation: NavigateFunction
) =>
  useMutation(updateQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      queryClient.invalidateQueries(["questionPost"]);
      navigation(`/question/view?id=${data.questionPostId}`, { replace: true });
    },
  });
