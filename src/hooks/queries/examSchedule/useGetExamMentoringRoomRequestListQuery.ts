import { useQuery } from "@tanstack/react-query";
import { CreateExamMentoringRoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
}

interface ApiResponse {
  message: string;
  requestList: CreateExamMentoringRoomRequest[];
}

const getExamMentoringRoomRequestList = async (
  params: ApiParams
): Promise<CreateExamMentoringRoomRequest[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-mentoring-room/create-request?examScheduleId=${params.examScheduleId}`
  );
  return data.requestList;
};

export const useGetExamMentoringRoomRequestListQuery = (params: ApiParams) =>
  useQuery(
    ["examMentoringRoom", "createRequest", params.examScheduleId],
    () => getExamMentoringRoomRequestList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
