import {
  CreateTestMentoringRoomRequest,
  initialTestScheduleCacheData,
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
  oldData = initialTestScheduleCacheData,
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
    return response.data;
    // testScheduleQueryClient.setQueriesData<TestScheduleCacheDataEntity>(
    //   [params.testScheduleId],
    //   (oldData) => updater(response.data, oldData, params.testScheduleId)
    // );
  } catch (error) {
    console.log("getTestMentoringRoomRequestList fail", error);
  }
};
