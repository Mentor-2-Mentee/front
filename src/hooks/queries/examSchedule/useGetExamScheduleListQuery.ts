import { useQuery } from "@tanstack/react-query";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamScheduleListParams {
  startDate: string;
  endDate: string;
}

interface GetExamScheduleListResponse {
  message: string;
  examScheduleList: ExamSchedule[];
}

const getExamScheduleList = async (
  params: GetExamScheduleListParams
): Promise<ExamSchedule[]> => {
  const { data } = await axiosInstance().get<GetExamScheduleListResponse>(
    `/examSchedule?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data.examScheduleList;
};

export const useGetExamScheduleListQuery = (
  params: GetExamScheduleListParams
) =>
  useQuery(["examSchedule", params], () => getExamScheduleList(params), {
    enabled: Boolean(params.startDate) && Boolean(params.endDate),
  });
