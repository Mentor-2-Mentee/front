import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

interface CreateTestMentoringRoomRequestParams {
  token: string;
  requestWorkField: string;
  testScheduleId: number;
}

export const createTestMentoringRoomRequest = async (
  params: CreateTestMentoringRoomRequestParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).post(
      "/test-mentoring-room/create-request",
      {
        requestWorkField: params.requestWorkField,
        testScheduleId: params.testScheduleId,
      }
    );
    return response.data;
  } catch (error) {
    throw `createTestMentoringRoomRequest fail ${error}`;
  }
};
