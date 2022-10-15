import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamReviewRoom, examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../auth";

interface PostExamReviewRoomFormParams {
  token: string;
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  userList: UserProfile[];
}

interface PostExamReviewRoomFormResponse {
  message: string;
  examReviewRoom: ExamReviewRoom;
  isCreated: boolean;
}

const postExamReviewRoomForm = async (
  params: PostExamReviewRoomFormParams
): Promise<ExamReviewRoom> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(
    config
  ).post<PostExamReviewRoomFormResponse>("/exam-review-room", params);
  return data.examReviewRoom;
};

export const usePostExamReviewRoomFormMutation = (examScheduleId: number) =>
  useMutation(postExamReviewRoomForm, {
    onSuccess: () => {
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        examScheduleId,
      ]);
    },
  });
