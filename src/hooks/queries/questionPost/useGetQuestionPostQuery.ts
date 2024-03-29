import { useQuery } from "@tanstack/react-query";
import { QuestionPost } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  postId: number;
}

interface ApiResponse {
  message: string;
  questionPost: QuestionPost;
}

const getQuestionPost = async (params: ApiParams) => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/question-post?postId=${params.postId}`
  );
  return data.questionPost;
};

export const useGetQuestionPostQuery = (params: ApiParams) =>
  useQuery(["questionPost", params.postId], () => getQuestionPost(params), {
    refetchOnWindowFocus: false,
    enabled: Boolean(params.postId !== 0),
  });
