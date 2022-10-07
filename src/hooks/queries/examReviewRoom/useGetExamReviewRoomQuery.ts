import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { ExamReviewRoom } from "../examSchedule";

interface GetExamReviewRoomParams {
  token?: string;
  examField?: string;
  examScheduleId?: string;
}

interface GetExamReviewRoomResponse {
  message: string;
  examReviewRoom: ExamReviewRoom;
}

const getExamReviewRoom = async (params: GetExamReviewRoomParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<GetExamReviewRoomResponse>(
    `/exam-review-room?examScheduleId=${params.examScheduleId}&examField=${params.examField}`
  );
  return data;
};

export const useGetExamReviewRoomQuery = (params: GetExamReviewRoomParams) =>
  useQuery(
    ["examReviewRoom", params.examScheduleId, params.examField],
    () => getExamReviewRoom(params),
    {
      enabled: Boolean(params.examScheduleId) && Boolean(params.examField),
    }
  );
