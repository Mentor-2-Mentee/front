import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  commentId: number;
}

interface ApiResponse {
  message: string;
}

const deleteQuestionPostComment = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/question-post-comment?commentId=${params.commentId}`
  );
  return data;
};

export const useDeleteQuestionPostCommentMutation = (
  questionPostId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(deleteQuestionPostComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questionPostComment", questionPostId]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
