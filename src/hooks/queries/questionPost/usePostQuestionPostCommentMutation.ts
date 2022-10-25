import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import React from "react";
import { QuestionPostComment, questionPostQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

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
export const usePostQuestionPostCommentMutation = (
  questionPostId: number,
  setComment: React.Dispatch<React.SetStateAction<string>>
) =>
  useMutation(postQuestionPostComment, {
    onSuccess: (data) => {
      questionPostQueryClient.invalidateQueries([
        "questionPostComment",
        questionPostId,
      ]);
      setComment("");
    },
  });
