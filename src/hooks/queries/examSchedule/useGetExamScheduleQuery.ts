import { useQuery } from "@tanstack/react-query";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamScheduleParams {
  examScheduleId: number;
}

interface GetExamScheduleResponse {
  message: string;
  examSchedule: ExamSchedule;
}

const getExamSchedule = async (
  params: GetExamScheduleParams
): Promise<ExamSchedule> => {
  const { data } = await axiosInstance().get<GetExamScheduleResponse>(
    `/examSchedule/${params.examScheduleId}`
  );
  return data.examSchedule;
};

export const useGetExamScheduleQuery = (params: GetExamScheduleParams) =>
  useQuery(["examSchedule", params], () => getExamSchedule(params), {
    enabled: Boolean(params.examScheduleId),
  });
