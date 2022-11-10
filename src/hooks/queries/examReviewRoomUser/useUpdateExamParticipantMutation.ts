import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  body: {
    examReviewRoomId: number;
    isParticipant: boolean;
  };
}

interface ApiResponse {
  message: string;
}

const updateExamParticipant = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).put<ApiResponse>(
    "/exam-review-room-user",
    params.body
  );
  return data;
};

export const useUpdateExamParticipantMutation = (
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateExamParticipant, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examReviewRoom"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
