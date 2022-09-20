import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { examScheduleQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

interface ApiResponse {}

const postExamMentoringRoomForRequestForm = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-mentoring-room/create-request",
    params
  );
  return data;
};

export const usePostExamMentoringRoomRequestMutation = (
  examScheduleId: number
) =>
  useMutation(postExamMentoringRoomForRequestForm, {
    onSuccess: () => {
      examScheduleQueryClient.invalidateQueries([
        "examMentoringRoom",
        "createRequest",
        examScheduleId,
      ]);
    },
  });
