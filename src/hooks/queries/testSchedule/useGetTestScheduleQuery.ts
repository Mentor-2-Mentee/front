import { useQuery } from "@tanstack/react-query";
import { TestSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetTestScheduleParams {
  testScheduleId: number;
}

interface GetTestScheduleResponse {
  message: string;
  testSchedule: TestSchedule;
}

const getTestSchedule = async (
  params: GetTestScheduleParams
): Promise<TestSchedule> => {
  const { data } = await axiosInstance().get<GetTestScheduleResponse>(
    `/testSchedule/${params.testScheduleId}`
  );
  return data.testSchedule;
};

export const useGetTestScheduleQuery = (params: GetTestScheduleParams) =>
  useQuery(["testSchedule", params], () => getTestSchedule(params), {
    enabled: Boolean(params.testScheduleId),
  });
