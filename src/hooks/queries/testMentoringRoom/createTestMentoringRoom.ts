import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../../../api/user/getUserProfile";

interface CreateTestMentoringRoomParams {
  token: string;
  testScheduleId: number;
  requestTestField: string;
  userList: UserProfile[];
}

export const createTestMentoringRoom = async (
  params: CreateTestMentoringRoomParams
) => {
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
