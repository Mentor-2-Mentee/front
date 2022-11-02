import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamQuestion } from ".";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  examQuestionForm: Pick<ExamQuestion, "id" | "questionText" | "solution">;
}

interface ApiResponse {
  message: string;
  isCreate: boolean;
}

const updateExamQuestionMutation = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).put<ApiResponse>(
    "/exam-question",
    params.examQuestionForm
  );

  return data;
};

export const useUpdateExamQuestionMutation = (examQuestionId: number) =>
  useMutation(updateExamQuestionMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["examQuestion"]);
    },
  });
