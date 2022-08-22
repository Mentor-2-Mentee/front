import {
  CreateTestMentoringRoomRequest,
  InitialTestScheduleCacheData,
  TestScheduleCacheDataEntity,
  testScheduleQueryClient,
} from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetCreateTestMentoringRoomRequestListParams {
  testScheduleId: number;
}

interface GetCreateTestMentoringRoomRequestListResponse {
  message: string;
  data: CreateTestMentoringRoomRequest[];
}

const updater = (
  response: GetCreateTestMentoringRoomRequestListResponse,
  oldData = InitialTestScheduleCacheData,
  testScheduleId: number
): TestScheduleCacheDataEntity => {
  const updatedTestScheduleMap = oldData.createTestMentoringRoomRequestMap;

  console.log("response.data", response.data);

  updatedTestScheduleMap.set(String(testScheduleId), response.data);

  return {
    ...oldData,
    createTestMentoringRoomRequestMap: updatedTestScheduleMap,
  };
};

export const getTestMentoringRoomRequestList = async (
  params: GetCreateTestMentoringRoomRequestListParams
) => {
  try {
    const response = await axiosInstance().get(
      `/test-mentoring-room/create-request?testScheduleId=${params.testScheduleId}`
    );
    testScheduleQueryClient.setQueriesData<TestScheduleCacheDataEntity>(
      ["createTestMentoringRoomRequest", params.testScheduleId],
      (oldData) => updater(response.data, oldData, params.testScheduleId)
    );
  } catch (error) {}
};
