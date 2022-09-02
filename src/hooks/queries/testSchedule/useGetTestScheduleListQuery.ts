import { useQuery } from "@tanstack/react-query";
import { TestSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestScheduleListParams {
  startDate: string;
  endDate: string;
}

interface GetTestScheduleListResponse {
  message: string;
  testScheduleList: TestSchedule[];
}

const getTestScheduleList = async (
  params: GetTestScheduleListParams
): Promise<TestSchedule[]> => {
  const { data } = await axiosInstance().get<GetTestScheduleListResponse>(
    `/testSchedule?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data.testScheduleList;
};

export const useGetTestScheduleListQuery = (
  params: GetTestScheduleListParams
) =>
  useQuery(["testSchedule", params], () => getTestScheduleList(params), {
    enabled: Boolean(params.startDate) && Boolean(params.endDate),
  });
