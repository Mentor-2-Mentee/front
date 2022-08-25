import {
  initialTestScheduleCacheData,
  TestScheduleCacheDataEntity,
  testScheduleQueryClient,
  TestMentoringRoom,
} from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestMentoringRoomListParams {
  testScheduleId: number;
}

interface GetTestMentoringRoomListResponse {
  message: string;
  data: TestMentoringRoom[];
}

const updater = (
  response: GetTestMentoringRoomListResponse,
  oldData = initialTestScheduleCacheData,
  testScheduleId: number
): TestScheduleCacheDataEntity => {
  const updatedTestMentoringRoomMap = oldData.testMentoringRoomMap;

  console.log("response.data", response.data);

  updatedTestMentoringRoomMap.set(String(testScheduleId), response.data);

  return {
    ...oldData,
    testMentoringRoomMap: updatedTestMentoringRoomMap,
  };
};

export const getTestMentoringRoomList = async (
  params: GetTestMentoringRoomListParams
) => {
  try {
    const response = await axiosInstance().get(
      `/test-mentoring-room?testScheduleId=${params.testScheduleId}`
    );
    testScheduleQueryClient.setQueriesData<TestScheduleCacheDataEntity>(
      [params.testScheduleId],
      (oldData) => updater(response.data, oldData, params.testScheduleId)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
