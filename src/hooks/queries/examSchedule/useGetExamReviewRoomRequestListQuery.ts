import { useQuery } from "@tanstack/react-query";
import { CreateExamReviewRoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
}

interface ApiResponse {
  message: string;
  requestList: CreateExamReviewRoomRequest[];
}

const getExamReviewRoomRequestList = async (
  params: ApiParams
): Promise<CreateExamReviewRoomRequest[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-mentoring-room/create-request?examScheduleId=${params.examScheduleId}`
  );
  return data.requestList;
};

export const useGetExamReviewRoomRequestListQuery = (params: ApiParams) =>
  useQuery(
    ["examReviewRoom", "createRequest", params.examScheduleId],
    () => getExamReviewRoomRequestList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
