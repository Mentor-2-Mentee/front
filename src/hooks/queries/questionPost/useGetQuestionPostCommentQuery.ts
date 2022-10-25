import { useQuery } from "@tanstack/react-query";
import { QuestionPostComment } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  questionPostId: number;
}

interface ApiResponse {
  message: string;
  commentList: QuestionPostComment[];
}

const getQuestionPostQuery = async (params: ApiParams) => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/post-comment?questionPostId=${params.questionPostId}`
  );
  return data;
};

export const useGetQuestionPostCommentQuery = (params: ApiParams) =>
  useQuery(["questionPostComment", params.questionPostId], () =>
    getQuestionPostQuery(params)
  );
