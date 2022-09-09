import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../../../api/user/getUserProfile";
import { ExamMentoringRoom, examScheduleQueryClient } from "../examSchedule";

interface PostExamMentoringRoomFormParams {
  token: string;
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  userList: UserProfile[];
}

interface PostExamMentoringRoomFormResponse {
  message: string;
  examMentoringRoom: ExamMentoringRoom;
  isCreated: boolean;
}

const postExamMentoringRoomForm = async (
  params: PostExamMentoringRoomFormParams
): Promise<ExamMentoringRoom> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(
    config
  ).post<PostExamMentoringRoomFormResponse>("/exam-mentoring-room", params);
  return data.examMentoringRoom;
};

export const usePostExamMentoringRoomFormMutation = (examScheduleId: number) =>
  useMutation(postExamMentoringRoomForm, {
    onSuccess: () => {
      examScheduleQueryClient.invalidateQueries([
        "examMentoringRoom",
        "createRequest",
        examScheduleId,
      ]);
      examScheduleQueryClient.invalidateQueries([
        "examMentoringRoom",
        examScheduleId,
      ]);
    },
  });
