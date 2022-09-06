import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { examScheduleQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface PostExamMentoringRoomForRequestFormParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

interface PostExamMentoringRoomForRequestFormResponse {}

const postExamMentoringRoomForRequestForm = async (
  params: PostExamMentoringRoomForRequestFormParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(
    config
  ).post<PostExamMentoringRoomForRequestFormResponse>(
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
