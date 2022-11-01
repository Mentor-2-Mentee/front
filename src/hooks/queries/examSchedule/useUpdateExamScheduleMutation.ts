import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  examScheduleId: number;
  examScheduleTitle: string;
  examUrl: string;
  examDate: string;
  examType: string;
  examDescription: string;
  imageUrl: string[];
}

interface ApiResponse {
  message: string;
  examScheduleUrl: string;
  examScheduleId: number;
}

const updateExamSchedule = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).put(`/examSchedule`, params);
  return data;
};

export const useUpdateExamScheduleMutation = (
  examScheduleId: number,
  navigation: NavigateFunction,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(updateExamSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examSchedule", examScheduleId]);
      navigation(`/exam-schedule#${data.examScheduleId}`);
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("삭제에 실패했습니다.", { variant: "error" });
    },
  });
