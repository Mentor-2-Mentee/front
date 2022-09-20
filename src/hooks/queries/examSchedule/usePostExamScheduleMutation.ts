import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";
import { examScheduleQueryClient } from ".";

interface ApiParams {
  token?: string;
  examScheduleTitle: string;
  examUrl: string;
  examDate: string;
  examField: string;
  examDescription: string;
  imageFileList: ImageFile[];
}

interface ApiResponse {
  message: string;
}

const postExamSchedule = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(params)) {
    if (key === "imageFileList") continue;
    formData.append(key, JSON.stringify(value));
  }

  params.imageFileList.map((imageFile: ImageFile) => {
    formData.append("image[]", imageFile.fileData, imageFile.fileName);
  });
  const { data } = await axiosInstance(config).post(`/examSchedule`, formData);
  return data;
};

export const usePostExamScheduleMutation = (examScheduleId: number) =>
  useMutation(postExamSchedule, {
    onSuccess: (data) => {
      examScheduleQueryClient.invalidateQueries([
        "examMentoringRoom",
        "createRequest",
        examScheduleId,
      ]);
      console.log(data);
    },
  });
