import { useQuery } from "@tanstack/react-query";
import { ExamQuestionComment } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examQuestionId: number;
}

interface ApiResponse {
  message: string;
  commentList: ExamQuestionComment[];
}

const getExamQuestionComment = async (params: ApiParams) => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `exam-question-comment?examQuestionId=${params.examQuestionId}`
  );
  return data;
};

export const useGetExamQuestionCommentQuery = (params: ApiParams) =>
  useQuery(["examQuestionComment", params.examQuestionId], () =>
    getExamQuestionComment(params)
  );
