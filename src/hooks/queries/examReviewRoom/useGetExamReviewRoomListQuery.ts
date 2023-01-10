import { useQuery } from "@tanstack/react-query";
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
  isRestricted: boolean;
  isArchived: boolean;
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
  return data.examReviewRoomList;
};

export const useGetExamReviewRoomListQuery = (params: ApiParams) =>
  useQuery(
    ["examReviewRoom", "list", params.examScheduleId],
    () => getExamReviewRoomList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
