import { useQuery } from "@tanstack/react-query";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
}

interface ApiResponse {
  message: string;
  examSchedule: ExamSchedule;
}

const getExamSchedule = async (params: ApiParams): Promise<ExamSchedule> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/examSchedule/${params.examScheduleId}`
  );
  return data.examSchedule;
};

export const useGetExamScheduleQuery = (params: ApiParams) =>
  useQuery(["examSchedule", params], () => getExamSchedule(params), {
    enabled: Boolean(params.examScheduleId),
  });
