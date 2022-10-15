import { useQuery } from "@tanstack/react-query";
import { ExamReviewRoom } from ".";

import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
  examField?: string;
}

interface ApiResponse {
  message: string;
  examReviewRoomList: ExamReviewRoom[];
}

const getExamReviewRoomList = async (
  params: ApiParams
): Promise<ExamReviewRoom[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-review-room?examScheduleId=${params.examScheduleId}`
  );
  console.log("joined", data);
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
