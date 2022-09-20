import { useQuery } from "@tanstack/react-query";
import { ExamMentoringRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  examScheduleId: number;
  examField?: string;
}

interface ApiResponse {
  message: string;
  examMentoringRoomList: ExamMentoringRoom[];
}

const getExamMentoringRoomList = async (
  params: ApiParams
): Promise<ExamMentoringRoom[]> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/exam-mentoring-room?examScheduleId=${params.examScheduleId}`
  );
  return data.examMentoringRoomList;
};

export const useGetExamMentoringRoomListQuery = (params: ApiParams) =>
  useQuery(
    ["examMentoringRoom", params.examScheduleId],
    () => getExamMentoringRoomList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
