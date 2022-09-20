import { useQuery } from "@tanstack/react-query";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  startDate: string;
  endDate: string;
}

interface ApiResponse {
  message: string;
  examScheduleList: ExamSchedule[];
}

const getExamScheduleList = async (
  params: ApiParams
): Promise<ExamSchedule[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/examSchedule?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data.examScheduleList;
};

export const useGetExamScheduleListQuery = (params: ApiParams) =>
  useQuery(["examSchedule", params], () => getExamScheduleList(params), {
    enabled: Boolean(params.startDate) && Boolean(params.endDate),
  });
