import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { ExamReviewRoom, examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../auth";

interface ApiParams {
  token: string;
  requestId: number;
}

interface ApiResponse {
  message: string;
  isCreated: boolean;
}

const postExamReviewRoomForm = async (
  params: ApiParams
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room",
    params
  );
  return data;
};

export const usePostExamReviewRoomFormMutation = (
  examScheduleId: number,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(postExamReviewRoomForm, {
    onSuccess: ({ message, isCreated }) => {
      if (!isCreated) return;
      enqueueSnackbar(message, { variant: "success" });
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        examScheduleId,
      ]);
    },
  });
