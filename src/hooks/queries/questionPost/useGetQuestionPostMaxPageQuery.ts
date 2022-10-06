import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  limit: number;
}

interface ApiResponse {
  message: string;
  maxPage: number;
}

const getQuestionPostMaxPage = async (
  params: ApiParams
): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get(
    `/question-post/max-page?limit=${params.limit}`
  );
  console.log("maxPage", data);
  return data;
};

export const useGetQuestionPostMaxPageQuery = (params: ApiParams) =>
  useQuery(["maxPage"], () => getQuestionPostMaxPage(params));
