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

const getQuestionPost = async (params: ApiParams): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/question-post?postId=${params.postId}`
  );
  console.log("postdata", data);
  return data;
};

export const useGetQuestionPostQuery = (params: ApiParams) =>
  useQuery(["questionPost", params], () => getQuestionPost(params), {
    refetchOnWindowFocus: false,
  });
