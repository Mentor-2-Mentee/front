import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import React from "react";
import { examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

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
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postExamReviewRoomForRequestForm, {
    onSuccess: (data) => {
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        "createRequest",
        examScheduleId,
      ]);
      enqueueSnackbar(data.message, { variant: "success" });
      if (setIsModalOpen) setIsModalOpen(false);
    },
    onError: (error) => {
      enqueueSnackbar("생성 신청 실패. 내용을 확인해주세요.", {
        variant: "error",
      });
    },
  });
