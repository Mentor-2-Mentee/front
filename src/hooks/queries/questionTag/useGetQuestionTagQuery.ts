import { useQuery } from "@tanstack/react-query";
import { QuestionTag } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiResponse {
  message: string;
  questionTagList: QuestionTag[];
}

const getQuestionTagList = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get(`/question-tag`);
  return data;
};

export const useGetQuestionTagQuery = () =>
  useQuery(["questionTag"], getQuestionTagList);
