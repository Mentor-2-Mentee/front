import { useQuery } from "@tanstack/react-query";
import { ExamMentoringRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamMentoringRoomListParams {
  examScheduleId: number;
  examField?: string;
}

interface GetExamMentoringRoomListResponse {
  message: string;
  examMentoringRoomList: ExamMentoringRoom[];
}

const getExamMentoringRoomList = async (
  params: GetExamMentoringRoomListParams
): Promise<ExamMentoringRoom[]> => {
  const { data } = await axiosInstance().get<GetExamMentoringRoomListResponse>(
    `/exam-mentoring-room?examScheduleId=${params.examScheduleId}`
  );
  return data.examMentoringRoomList;
};

export const useGetExamMentoringRoomListQuery = (
  params: GetExamMentoringRoomListParams
) =>
  useQuery(
    ["examMentoringRoom", params.examScheduleId],
    () => getExamMentoringRoomList(params),
    {
      enabled: Boolean(params.examScheduleId),
    }
  );
