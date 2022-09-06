import { useQuery } from "@tanstack/react-query";
import { CreateExamMentoringRoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamMentoringRoomRequestListParams {
  examScheduleId: number;
}

interface GetExamMentoringRoomRequestListResponse {
  message: string;
  requestList: CreateExamMentoringRoomRequest[];
}

const getExamMentoringRoomRequestList = async (
  params: GetExamMentoringRoomRequestListParams
): Promise<CreateExamMentoringRoomRequest[]> => {
  const { data } =
    await axiosInstance().get<GetExamMentoringRoomRequestListResponse>(
      `/exam-mentoring-room/create-request?examScheduleId=${params.examScheduleId}`
    );
  return data.requestList;
};

export const useGetExamMentoringRoomRequestListQuery = (
  params: GetExamMentoringRoomRequestListParams
) =>
  useQuery(
    ["examMentoringRoom", "createRequest", params.examScheduleId],
    () => getExamMentoringRoomRequestList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
