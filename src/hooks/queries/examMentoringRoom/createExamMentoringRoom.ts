import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../../../api/user/getUserProfile";

interface CreateExamMentoringRoomParams {
  token: string;
  examScheduleId: number;
  examField: string;
  userList: UserProfile[];
}

export const createExamMentoringRoom = async (
  params: CreateExamMentoringRoomParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  try {
    const response = await axiosInstance(config).post(
      "/exam-mentoring-room",
      params
    );
    console.log(response.data);
  } catch (error) {
    throw `createExamMentoringRoom failed by ${error}`;
  }
};
