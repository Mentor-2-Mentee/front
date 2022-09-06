import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { examScheduleQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface DeleteExamMentoringRoomRequestParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

const deleteExamMentoringRoomRequest = async (
  params: DeleteExamMentoringRoomRequestParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete(
    `/exam-mentoring-room/create-request?examScheduleId=${params.examScheduleId}&examField=${params.examField}`
  );
  return data;
};

export const useDeleteExamMentoringRoomRequestMutation = (
  examScheduleId: number
) =>
  useMutation(deleteExamMentoringRoomRequest, {
    onSuccess: () => {
      examScheduleQueryClient.invalidateQueries([
        "examMentoringRoom",
        "createRequest",
        examScheduleId,
      ]);
    },
  });
