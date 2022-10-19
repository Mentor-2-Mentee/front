import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { examReviewRoomQueryClient } from ".";

interface ApiParams {
  token: string;
  requestId: number;
  examType: string;
}

interface ApiResponse {
  message: string;
  isDelete: boolean;
}

const deleteExamReviewRoomRequest = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/exam-review-room/create-request?requestId=${params.requestId}&examType=${params.examType}`
  );
  return data;
};

export const useDeleteExamReviewRoomRequestMutation = (
  examScheduleId: number
) =>
  useMutation(deleteExamReviewRoomRequest, {
    onSuccess: ({ isDelete }) => {
      if (isDelete) {
        examReviewRoomQueryClient.invalidateQueries([
          "examReviewRoom",
          "createRequest",
          examScheduleId,
        ]);
      }
    },
  });
