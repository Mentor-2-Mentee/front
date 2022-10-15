import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { examScheduleQueryClient } from ".";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

interface ApiParams {
  token: string;
  examScheduleId: number;
}

interface ApiResponse {
  message: string;
}

const deleteExamSchedule = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete(
    `/exam-schedule?examScheduleId=${params.examScheduleId}`
  );
  return data;
};

export const useDeleteExamScheduleMutation = (
  navigation: NavigateFunction,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(deleteExamSchedule, {
    onSuccess: (data) => {
      examScheduleQueryClient.invalidateQueries(["examSchedule"]);
      enqueueSnackbar(data.message, { variant: "success" });
      navigation(`/exam-schedule`);
    },
  });
