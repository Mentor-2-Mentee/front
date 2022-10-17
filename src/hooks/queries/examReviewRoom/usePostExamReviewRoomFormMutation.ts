import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamReviewRoom, examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../auth";

interface ApiParams {
  token: string;
  examScheduleId: number;
  examType: string;
}

interface ApiResponse {
  message: string;
  isCreated: boolean;
}

const postExamReviewRoomForm = async (
  params: ApiParams
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room",
    params
  );
  return data;
};

export const usePostExamReviewRoomFormMutation = (examScheduleId: number) =>
  useMutation(postExamReviewRoomForm, {
    onSuccess: ({ isCreated }) => {
      if (!isCreated) return;
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        examScheduleId,
      ]);
    },
  });
