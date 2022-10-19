import { useQuery } from "@tanstack/react-query";
import { CreateExamReviewRoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
  userId?: string;
}
interface ApiResponse {
  message: string;
  requestList: CreateExamReviewRoomRequest[];
}

const getExamReviewRoomRequestList = async (
  params: ApiParams
): Promise<CreateExamReviewRoomRequest[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-review-room/create-request?examScheduleId=${params.examScheduleId}&userId=${params.userId}`
  );

  console.log(
    `/exam-review-room/create-request?examScheduleId=${params.examScheduleId}&userId=${params.userId}`,
    "create request list",
    data
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
