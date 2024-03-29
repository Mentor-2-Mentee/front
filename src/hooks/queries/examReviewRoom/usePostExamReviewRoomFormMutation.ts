import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: EnqueueSnackbar,
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postExamReviewRoomForm, {
    onSuccess: ({ message, isCreated }) => {
      if (!isCreated) return;
      queryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      queryClient.invalidateQueries(["examReviewRoom", examScheduleId]);
      enqueueSnackbar(message, { variant: "success" });
      if (setIsModalOpen) setIsModalOpen(false);
    },
  });
