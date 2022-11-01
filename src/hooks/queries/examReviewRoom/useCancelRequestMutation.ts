import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
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
