import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import queryClient from "../queryClientInit";
import { ExamSchedule } from ".";
import { EnqueueSnackbar } from "../../../models/types";

interface ApiParams {
  token: string;
  examScheduleForm: Pick<
    ExamSchedule,
    | "id"
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

const updateExamSchedule = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  console.log("수정내용", params.examScheduleForm);
  const { data } = await axiosInstance(config).put(
    `/exam-schedule`,
    params.examScheduleForm
  );
  return data;
};

export const useUpdateExamScheduleMutation = (
  examScheduleId: number,
  navigation: NavigateFunction,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(updateExamSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examSchedule", examScheduleId]);
      navigation(`/exam-schedule#${data.examScheduleId}`);
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("수정에 실패했습니다.", { variant: "error" });
    },
  });
