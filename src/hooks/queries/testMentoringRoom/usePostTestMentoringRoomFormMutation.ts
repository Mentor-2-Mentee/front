import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../../../api/user/getUserProfile";
import { TestMentoringRoom, testScheduleQueryClient } from "../testSchedule";

interface PostTestMentoringRoomFormParams {
  token: string;
  testScheduleId: number;
  testField: string;
  userList: UserProfile[];
}

interface PostTestMentoringRoomFormResponse {
  message: string;
  testMentoringRoom: TestMentoringRoom;
  isCreated: boolean;
}

const postTestMentoringRoomForm = async (
  params: PostTestMentoringRoomFormParams
): Promise<TestMentoringRoom> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(
    config
  ).post<PostTestMentoringRoomFormResponse>("/test-mentoring-room", params);
  return data.testMentoringRoom;
};

export const usePostTestMentoringRoomFormMutation = (testScheduleId: number) =>
  useMutation(postTestMentoringRoomForm, {
    onSuccess: () => {
      testScheduleQueryClient.invalidateQueries([
        "testMentoringRoom",
        "createRequest",
        testScheduleId,
      ]);
      testScheduleQueryClient.invalidateQueries([
        "testMentoringRoom",
        testScheduleId,
      ]);
    },
  });
