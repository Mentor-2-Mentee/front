import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  examType: string;
  examScheduleId: number;
  isParticipant: boolean;
}

interface ApiResponse {
  message: string;
}

const postExamReviewRoomForRequestForm = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room/create-request",
    params
  );
  return data;
};

export const usePostExamReviewRoomRequestMutation = (
  examScheduleId: number,
  enqueueSnackbar: EnqueueSnackbar,
  IsOpenDispatcher?: (nowOpen: boolean) => void
) =>
  useMutation(postExamReviewRoomForRequestForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      enqueueSnackbar(data.message, { variant: "success" });
      if (IsOpenDispatcher) IsOpenDispatcher(false);
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      console.log(error);
      enqueueSnackbar(error.response?.data.message, {
        variant: "error",
      });
    },
  });
