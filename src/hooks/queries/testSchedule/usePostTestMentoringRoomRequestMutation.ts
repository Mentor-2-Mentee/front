import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { testScheduleQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface PostTestMentoringRoomForRequestFormParams {
  token: string;
  testField: string;
  testScheduleId: number;
}

interface PostTestMentoringRoomForRequestFormResponse {}

const postTestMentoringRoomForRequestForm = async (
  params: PostTestMentoringRoomForRequestFormParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(
    config
  ).post<PostTestMentoringRoomForRequestFormResponse>(
    "/test-mentoring-room/create-request",
    params
  );
  return data;
};

export const usePostTestMentoringRoomRequestMutation = (
  testScheduleId: number
) =>
  useMutation(postTestMentoringRoomForRequestForm, {
    onSuccess: () => {
      testScheduleQueryClient.invalidateQueries([
        "testMentoringRoom",
        "createRequest",
        testScheduleId,
      ]);
    },
  });
