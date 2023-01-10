import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: EnqueueSnackbar,
  navigation: NavigateFunction
) =>
  useMutation(deleteQuestionPost, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      queryClient.invalidateQueries(["questionPost"]);
      navigation(`/question/list`, { replace: true });
    },
  });
