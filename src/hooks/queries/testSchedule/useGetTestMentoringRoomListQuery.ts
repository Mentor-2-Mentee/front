import { useQuery } from "@tanstack/react-query";
import { TestMentoringRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestMentoringRoomListParams {
  testScheduleId: number;
}

interface GetTestMentoringRoomListResponse {
  message: string;
  testMentoringRoomList: TestMentoringRoom[];
}

const getTestMentoringRoomList = async (
  params: GetTestMentoringRoomListParams
): Promise<TestMentoringRoom[]> => {
  const { data } = await axiosInstance().get<GetTestMentoringRoomListResponse>(
    `/test-mentoring-room?testScheduleId=${params.testScheduleId}`
  );
  return data.testMentoringRoomList;
};

export const useGetTestMentoringRoomListQuery = (
  params: GetTestMentoringRoomListParams
) =>
  useQuery(
    ["testMentoringRoom", params],
    () => getTestMentoringRoomList(params),
    {
      enabled: Boolean(params.testScheduleId),
    }
  );
