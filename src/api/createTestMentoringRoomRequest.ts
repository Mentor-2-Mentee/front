import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

interface CreateTestMentoringRoomRequestParams {
  token: string;
  requestTestField: string;
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
        requestTestField: params.requestTestField,
        testScheduleId: params.testScheduleId,
      }
    );
    return response.data;
  } catch (error) {
    throw `createTestMentoringRoomRequest fail ${error}`;
  }
};
