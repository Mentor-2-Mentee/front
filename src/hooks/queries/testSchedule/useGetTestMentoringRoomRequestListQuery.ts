import { useQuery } from "@tanstack/react-query";
import { CreateTestMentoringRoomRequest } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestMentoringRoomRequestListParams {
  testScheduleId: number;
}

interface GetTestMentoringRoomRequestListResponse {
  message: string;
  requestList: CreateTestMentoringRoomRequest[];
}

const getTestMentoringRoomRequestList = async (
  params: GetTestMentoringRoomRequestListParams
): Promise<CreateTestMentoringRoomRequest[]> => {
  const { data } =
    await axiosInstance().get<GetTestMentoringRoomRequestListResponse>(
      `/test-mentoring-room/create-request?testScheduleId=${params.testScheduleId}`
    );
  return data.requestList;
};

export const useGetTestMentoringRoomRequestListQuery = (
  params: GetTestMentoringRoomRequestListParams
) =>
  useQuery(
    ["testMentoringRoom", "createRequest", params.testScheduleId],
    () => getTestMentoringRoomRequestList(params),
    {
      enabled: Boolean(params.testScheduleId),
    }
  );
