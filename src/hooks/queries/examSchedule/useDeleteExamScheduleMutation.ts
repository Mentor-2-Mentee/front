import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router";
import queryClient from "../queryClientInit";
import { EnqueueSnackbar } from "../../../models/types";

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
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(deleteExamSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examSchedule"]);
      enqueueSnackbar(data.message, { variant: "success" });
      navigation(`/exam-schedule`);
    },
  });
