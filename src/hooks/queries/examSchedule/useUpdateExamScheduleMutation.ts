import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";
import { examScheduleQueryClient } from ".";
import { NavigateFunction } from "react-router";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

interface ApiParams {
  token: string;
  examScheduleId: number;
  examScheduleTitle: string;
  examUrl: string;
  examDate: string;
  examField: string;
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
      // "Content-Type": "multipart/form-data",
    },
  };

  // const formData = new FormData();

  // for (const [key, value] of Object.entries(params)) {
  //   if (key === "imageFileList") continue;
  //   formData.append(key, JSON.stringify(value));
  // }

  // params.imageFileList.map((imageFile: ImageFile) => {
  //   formData.append("image[]", imageFile.fileData, imageFile.fileName);
  // });
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
      examScheduleQueryClient.invalidateQueries([
        "examSchedule",
        examScheduleId,
      ]);
      navigation(`/exam-schedule#${data.examScheduleId}`);
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("삭제에 실패했습니다.", { variant: "error" });
    },
  });
