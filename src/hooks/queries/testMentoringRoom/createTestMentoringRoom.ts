import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

export const createTestMentoringRoom = async (params: any) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  try {
    const response = await axiosInstance(config).post(
      "/test-mentoring-room",
      params
    );
    console.log(response.data);
  } catch (error) {
    throw `createTestMentoringRoom failed by ${error}`;
  }
};
