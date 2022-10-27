import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamQuestionComment, examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  commentForm: Omit<ExamQuestionComment, "id" | "createdAt" | "updatedAt">;
}

interface ApiResponse {
  message: string;
  isCreate: boolean;
}

const postExamQuestionComment = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "exam-question-comment",
    params.commentForm
  );
  return data;
};

export const usePostExamQuestionCommentMutation = (examQuestionId: number) =>
  useMutation(postExamQuestionComment, {
    onSuccess: () => {
      examReviewRoomQueryClient.invalidateQueries([
        "examQuestionComment",
        examQuestionId,
      ]);
    },
  });
