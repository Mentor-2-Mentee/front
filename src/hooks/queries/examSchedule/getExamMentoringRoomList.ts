import {
  initialExamScheduleCacheData,
  ExamScheduleCacheDataEntity,
  examScheduleQueryClient,
  ExamMentoringRoom,
} from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamMentoringRoomListParams {
  examScheduleId: number;
}

interface GetExamMentoringRoomListResponse {
  message: string;
  data: ExamMentoringRoom[];
}

const updater = (
  response: GetExamMentoringRoomListResponse,
  oldData = initialExamScheduleCacheData,
  examScheduleId: number
): ExamScheduleCacheDataEntity => {
  const updatedExamMentoringRoomMap = oldData.examMentoringRoomMap;

  console.log("response.data", response.data);

  updatedExamMentoringRoomMap.set(String(examScheduleId), response.data);

  return {
    ...oldData,
    examMentoringRoomMap: updatedExamMentoringRoomMap,
  };
};

export const getExamMentoringRoomList = async (
  params: GetExamMentoringRoomListParams
) => {
  try {
    const response = await axiosInstance().get(
      `/exam-mentoring-room?examScheduleId=${params.examScheduleId}`
    );
    examScheduleQueryClient.setQueriesData<ExamScheduleCacheDataEntity>(
      [params.examScheduleId],
      (oldData) => updater(response.data, oldData, params.examScheduleId)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
