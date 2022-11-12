import { useQuery } from "@tanstack/react-query";
import { UserExist } from ".";

import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
  userId?: string;
}

interface ExamReviewRoom {
  id: number;
  examType: string;
  userPosition?: string;
  isParticipant?: boolean;
  totalUserCount: number;
  isClosed: boolean;
}

interface ApiResponse {
  message: string;
  examReviewRoomList: ExamReviewRoom[];
}

const getExamReviewRoomList = async (
  params: ApiParams
): Promise<ExamReviewRoom[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-review-room/list?examScheduleId=${params.examScheduleId}&userId=${params.userId}`
  );
  console.log("data", data);
  return data.examReviewRoomList;
};

export const useGetExamReviewRoomListQuery = (params: ApiParams) =>
  useQuery(
    ["examReviewRoom", params.examScheduleId],
    () => getExamReviewRoomList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
