import { useQuery } from "@tanstack/react-query";
import { CreateExamReviewRoomRequest as RoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
}

interface CreateExamReviewRoomRequest extends RoomRequest {
  isSubmitted?: boolean;
}

interface ApiResponse {
  message: string;
  requestList: CreateExamReviewRoomRequest[];
}

const getExamReviewRoomRequestList = async (
  params: ApiParams
): Promise<CreateExamReviewRoomRequest[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-review-room/create-request?examScheduleId=${params.examScheduleId}`
  );
  console.log("roomReq list raw api", data);
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
