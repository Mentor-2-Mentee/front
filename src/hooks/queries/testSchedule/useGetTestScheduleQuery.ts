import { useQuery } from "@tanstack/react-query";
import { TestSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestScheduleParams {
  startDate: string;
  endDate: string;
}

interface GetTestScheduleResponse {
  message: string;
  testScheduleList: TestSchedule[];
}

const getTestSchedule = async (
  params: GetTestScheduleParams
): Promise<TestSchedule[]> => {
  const { data } = await axiosInstance().get<GetTestScheduleResponse>(
    `/testSchedule?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data.testScheduleList;
};

export const useGetTestScheduleQuery = (params: GetTestScheduleParams) =>
  useQuery(["testSchedule", params], () => getTestSchedule(params), {
    enabled: Boolean(params.startDate) && Boolean(params.endDate),
  });
