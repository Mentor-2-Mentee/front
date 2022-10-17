import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamReviewRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamReviewRoomParams {
  token?: string;
  examType?: string;
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
    `/exam-review-room?examScheduleId=${params.examScheduleId}&examType=${params.examType}`
  );
  return data;
};

export const useGetExamReviewRoomQuery = (params: GetExamReviewRoomParams) =>
  useQuery(
    ["examReviewRoom", params.examScheduleId, params.examType],
    () => getExamReviewRoom(params),
    {
      enabled: Boolean(params.examScheduleId) && Boolean(params.examType),
    }
  );
