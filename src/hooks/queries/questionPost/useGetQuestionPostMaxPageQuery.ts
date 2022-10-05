import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {}

interface ApiResponse {
  message: string;
  maxPage: number;
}

const getQuestionPostMaxPage = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get("/question-post/max-page");
  console.log(data);
  return data;
};

export const useGetQuestionPostMaxPageQuery = () =>
  useQuery(["maxPage"], () => getQuestionPostMaxPage());
