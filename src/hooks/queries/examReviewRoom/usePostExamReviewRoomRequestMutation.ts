import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

interface ApiResponse {}

const postExamReviewRoomForRequestForm = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room/create-request",
    params
  );
  return data;
};

export const usePostExamReviewRoomRequestMutation = (examScheduleId: number) =>
  useMutation(postExamReviewRoomForRequestForm, {
    onSuccess: () => {
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
    },
  });
