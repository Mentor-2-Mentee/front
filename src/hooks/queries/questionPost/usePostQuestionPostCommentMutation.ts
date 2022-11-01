import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { QuestionPostComment } from ".";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";

interface ApiParams {
  token?: string;
  commentForm: Omit<QuestionPostComment, "id" | "createdAt" | "updatedAt">;
}

interface ApiResponse {
  message: string;
  isCreate: boolean;
}

const postQuestionPostComment = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    `/post-comment`,
    params.commentForm
  );
  return data;
};
export const usePostQuestionPostCommentMutation = (questionPostId: number) =>
  useMutation(postQuestionPostComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["questionPostComment", questionPostId]);
    },
  });
