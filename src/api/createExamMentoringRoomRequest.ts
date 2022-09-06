import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

interface CreateExamMentoringRoomRequestParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

export const createExamMentoringRoomRequest = async (
  params: CreateExamMentoringRoomRequestParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).post(
      "/exam-mentoring-room/create-request",
      {
        examField: params.examField,
        examScheduleId: params.examScheduleId,
      }
    );
    return response.data;
  } catch (error) {
    throw `createExamMentoringRoomRequest fail ${error}`;
  }
};
