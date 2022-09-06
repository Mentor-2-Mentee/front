import {
  CreateExamMentoringRoomRequest,
  initialExamScheduleCacheData,
  ExamScheduleCacheDataEntity,
  examScheduleQueryClient,
} from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetCreateExamMentoringRoomRequestListParams {
  examScheduleId: number;
}

interface GetCreateExamMentoringRoomRequestListResponse {
  message: string;
  data: CreateExamMentoringRoomRequest[];
}

const updater = (
  response: GetCreateExamMentoringRoomRequestListResponse,
  oldData = initialExamScheduleCacheData,
  examScheduleId: number
): ExamScheduleCacheDataEntity => {
  const updatedExamScheduleMap = oldData.createExamMentoringRoomRequestMap;

  console.log("response.data", response.data);

  updatedExamScheduleMap.set(String(examScheduleId), response.data);

  return {
    ...oldData,
    createExamMentoringRoomRequestMap: updatedExamScheduleMap,
  };
};

export const getExamMentoringRoomRequestList = async (
  params: GetCreateExamMentoringRoomRequestListParams
) => {
  try {
    const response = await axiosInstance().get(
      `/exam-mentoring-room/create-request?examScheduleId=${params.examScheduleId}`
    );
    return response.data;
    // examScheduleQueryClient.setQueriesData<ExamScheduleCacheDataEntity>(
    //   [params.examScheduleId],
    //   (oldData) => updater(response.data, oldData, params.examScheduleId)
    // );
  } catch (error) {
    console.log("getExamMentoringRoomRequestList fail", error);
  }
};
