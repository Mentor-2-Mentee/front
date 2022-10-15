import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { examReviewRoomQueryClient } from ".";

interface DeleteExamReviewRoomRequestParams {
  token: string;
  examField: string;
  examScheduleId: number;
}

const deleteExamReviewRoomRequest = async (
  params: DeleteExamReviewRoomRequestParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete(
    `/exam-review-room/create-request?examScheduleId=${params.examScheduleId}&examField=${params.examField}`
  );
  return data;
};

export const useDeleteExamReviewRoomRequestMutation = (
  examScheduleId: number
) =>
  useMutation(deleteExamReviewRoomRequest, {
    onSuccess: () => {
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
    },
  });
