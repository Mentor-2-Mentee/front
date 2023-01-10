import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { QuestionPostForm } from ".";
import { NavigateFunction } from "react-router";
import queryClient from "../queryClientInit";
import { EnqueueSnackbar } from "../../../models/types";

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
  enqueueSnackbar: EnqueueSnackbar,
  navigation: NavigateFunction
) =>
  useMutation(postQuestionPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questionPost"]);
      enqueueSnackbar(data.message, { variant: "success" });
      navigation(`/question/view?id=${data.questionPostId}`);
    },
  });
