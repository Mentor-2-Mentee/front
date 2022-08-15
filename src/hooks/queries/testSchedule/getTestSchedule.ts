import {
  TestSchedule,
  TestScheduleCacheDataEntity,
  testScheduleQueryClient,
} from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestScheduleParams {
  startDate: Date;
  endDate: Date;
}
interface GetTestScheduleResponse {
  testScheduleObjectEntries: Object;
}

const updater = (
  newData: GetTestScheduleResponse,
  oldData?: TestScheduleCacheDataEntity
): TestScheduleCacheDataEntity => {
  const result = new Map();

  for (const scheduleList of Object.entries(
    newData.testScheduleObjectEntries
  )) {
    result.set(scheduleList[0], scheduleList[1]);
  }

  return {
    testScheduleMap: result,
  };
};

export const getTestSchedule = async ({
  startDate,
  endDate,
}: GetTestScheduleParams) => {
  try {
    const response = await axiosInstance().get(
      `/testSchedule?startDate=${startDate.toString()}&endDate=${endDate.toString()}`
    );
    console.log(response.data);
    testScheduleQueryClient.setQueriesData<TestScheduleCacheDataEntity>(
      ["testSchedule", startDate, endDate],
      (oldData) => updater(response.data, oldData)
    );
  } catch (error) {
    console.log(error);
  }
};
