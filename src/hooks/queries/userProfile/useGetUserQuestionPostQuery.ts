import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { QuestionPost } from "../questionPost";

interface ApiParams {
  token?: string;
}

interface ApiResponse {
  message: string;
  questionPost: Pick<QuestionPost, "id" | "title">[];
}

const getUserQuestionPostList = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).get<ApiResponse>(
    "/user-profile/question-post"
  );
  return data;
};

export const useGetUserQuestionPostQuery = (params: ApiParams) =>
  useQuery(["userProfile", "questionPost"], () =>
    getUserQuestionPostList(params)
  );
