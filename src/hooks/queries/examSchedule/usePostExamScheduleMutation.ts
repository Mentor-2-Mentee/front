import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import queryClient from "../queryClientInit";
import { ExamSchedule } from ".";
import { EnqueueSnackbar } from "../../../models/types";

interface ApiParams {
  token: string;
  examScheduleForm: Pick<
    ExamSchedule,
    | "organizer"
    | "examUrl"
    | "examDate"
    | "scheduleType"
    | "description"
    | "imageUrl"
    | "examStartTime"
    | "examEndTime"
  >;
}

interface ApiResponse {
  message: string;
  examScheduleUrl: string;
  examScheduleId: number;
}

const postExamSchedule = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    `/exam-schedule`,
    params.examScheduleForm
  );
  return data;
};

export const usePostExamScheduleMutation = (
  navigation: NavigateFunction,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(postExamSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examSchedule"]);
      navigation(`/exam-schedule#${data.examScheduleId}`);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
