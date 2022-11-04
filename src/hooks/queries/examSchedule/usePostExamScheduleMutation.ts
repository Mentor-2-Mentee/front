import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
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

const postExamSchedule = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post(`/exam-schedule`, params);
  return data;
};

export const usePostExamScheduleMutation = (
  navigation: NavigateFunction,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(postExamSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examSchedule"]);
      navigation(`/exam-schedule#${data.examScheduleId}`);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
