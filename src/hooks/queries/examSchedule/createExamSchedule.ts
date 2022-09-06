import { AxiosRequestConfig } from "axios";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";

export interface CreateExamScheduleParams {
  token: string;
  examScheduleTitle: string;
  examUrl: string;
  examDate: Date | null;
  examField: string;
  imageFileList: ImageFile[];
  examDescription: string;
}

interface CreateExamScheduleResponse {
  message: string;
  data: ExamSchedule;
}

export const createExamSchedule = async (
  params: CreateExamScheduleParams
): Promise<CreateExamScheduleResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const formData = new FormData();

    for (const [key, value] of Object.entries(params)) {
      if (key === "imageFileList") continue;
      formData.append(key, JSON.stringify(value));
    }

    params.imageFileList.map((imageFile: ImageFile) => {
      formData.append("image[]", imageFile.fileData, imageFile.fileName);
    });
    const response = await axiosInstance(config).post(
      `/examSchedule`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(`createExamSchedule failed by ${error}`);
  }
};
