import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamMentoringRoomParams {
  token?: string;
  examField?: string;
  examScheduleId?: string;
}

const getExamMentoringRoom = async (params: GetExamMentoringRoomParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<any>(
    `/exam-mentoring-room?examScheduleId=${params.examScheduleId}&examField=${params.examField}`
  );
  return data;
};

export const useGetExamMentoringRoomQuery = (
  params: GetExamMentoringRoomParams
) =>
  useQuery(
    ["examMentoringRoom", params.examScheduleId, params.examField],
    () => getExamMentoringRoom(params),
    {
      enabled: Boolean(params.examScheduleId) && Boolean(params.examField),
    }
  );
