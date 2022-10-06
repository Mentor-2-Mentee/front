import { useQuery } from "@tanstack/react-query";
import { QuestionPost } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { FilterOption } from "../../../commonElements/FilterOptionHandler";

interface ApiParams {
  filter: FilterOption;
  page: number;
  limit: number;
}

interface ApiResponse {
  message: string;
  questionPost: QuestionPost[];
}

const getQuestionPostList = async (params: ApiParams): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get(
    `/question-post/list?page=${params.page}&limit=${
      params.limit
    }&filter=${JSON.stringify(params.filter)}`
  );
  return data;
};

export const useGetQuestionPostListQuery = (params: ApiParams) =>
  useQuery(["questionPost", params], () => getQuestionPostList(params));
