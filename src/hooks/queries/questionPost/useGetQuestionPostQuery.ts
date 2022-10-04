import { useQuery } from "@tanstack/react-query";
import { QuestionPost } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {}

interface ApiResponse {
  message: string;
  questionPost: QuestionPost[];
}

const getQuestionPost = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get("question-post");

  console.log("rawApi", data);
  return data;
};

export const useGetQuestionPostQuery = () =>
  useQuery(["questionPost"], () => getQuestionPost());
