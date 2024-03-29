import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  requestId: number;
  examType: string;
}

interface ApiResponse {
  message: string;
  isDeleted: boolean;
}

const deleteRequest = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/exam-review-room/create-request?requestId=${params.requestId}&examType=${params.examType}`
  );
  return data;
};

export const useDeleteRequestMutation = (
  examScheduleId: number,
  enqueueSnackbar: EnqueueSnackbar,
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(deleteRequest, {
    onSuccess: ({ message, isDeleted }) => {
      if (isDeleted) {
        queryClient.invalidateQueries([
          "examReviewRoom",
          "createRequest",
          examScheduleId,
        ]);
        enqueueSnackbar(message, { variant: "success" });
        if (setIsModalOpen) setIsModalOpen(false);
      }
    },
  });
