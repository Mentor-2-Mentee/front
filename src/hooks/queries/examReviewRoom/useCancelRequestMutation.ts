import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";
import { EnqueueSnackbar } from "../../../models/types";

interface ApiParams {
  token: string;
  requestId: number;
  examType: string;
}

interface ApiResponse {
  message: string;
  isCanceled: boolean;
}

const cancelRequest = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).put<ApiResponse>(
    `/exam-review-room/create-request?requestId=${params.requestId}&examType=${params.examType}`
  );
  return data;
};

export const useCancelRequestMutation = (
  examScheduleId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(cancelRequest, {
    onSuccess: ({ message, isCanceled }) => {
      if (isCanceled) {
        queryClient.invalidateQueries([
          "examReviewRoom",
          "createRequest",
          examScheduleId,
        ]);
        enqueueSnackbar(message, { variant: "warning" });
      }
    },
  });
