import {
  initialTestScheduleCacheData,
  TestSchedule,
  TestScheduleCacheDataEntity,
  testScheduleQueryClient,
} from ".";
import axiosInstance from "../../../api/axiosInstance";
import DateFormatting from "../../../utils/dateFormatting";

interface GetTestScheduleParams {
  startDate: string;
  endDate: string;
}
interface GetTestScheduleResponse {
  testScheduleList: TestSchedule[];
}

const updater = (
  response: GetTestScheduleResponse,
  oldData = initialTestScheduleCacheData
): TestScheduleCacheDataEntity => {
  const updatedTestScheduleMap = oldData.testScheduleMap;
  response.testScheduleList.map((insertTestSchedule) => {
    const insertTestScheduleDate_YYYY_MM_DD = new DateFormatting(
      insertTestSchedule.testDate
    ).YYYY_MM_DD;
    const targetDateScheduleList = updatedTestScheduleMap.get(
      insertTestScheduleDate_YYYY_MM_DD
    );

    if (!targetDateScheduleList) {
      oldData.testScheduleMap.set(insertTestScheduleDate_YYYY_MM_DD, [
        insertTestSchedule,
      ]);
      return;
    }

    const isExist =
      targetDateScheduleList.findIndex(
        (schedule) =>
          schedule.testScheduleId === insertTestSchedule.testScheduleId
      ) !== -1;
    if (isExist) return;
    targetDateScheduleList.push(insertTestSchedule);
  });

  return {
    ...oldData,
    testScheduleMap: updatedTestScheduleMap,
  };
};

export const getTestSchedule = async ({
  startDate,
  endDate,
}: GetTestScheduleParams) => {
  try {
    const response = await axiosInstance().get(
      `/testSchedule?startDate=${startDate}&endDate=${endDate}`
    );
    testScheduleQueryClient.setQueriesData<TestScheduleCacheDataEntity>(
      ["testSchedule"],
      (oldData) => updater(response.data, oldData)
    );
  } catch (error) {
    console.log(error);
  }
};
