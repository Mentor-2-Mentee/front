import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamQuestion } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  examReviewRoomId: number;
}

interface ApiResponse {
  message: string;
  examQuestionList: ExamQuestion[];
}

const getExamQuestionList = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<ApiResponse>(
    `/exam-question/list?examReviewRoomId=${params.examReviewRoomId}`
  );
  console.log("data", data);
  return data;
};

export const useGetExamQuestionListQuery = (params: ApiParams) =>
  useQuery(["examQuestion", params.examReviewRoomId], () =>
    getExamQuestionList(params)
  );
