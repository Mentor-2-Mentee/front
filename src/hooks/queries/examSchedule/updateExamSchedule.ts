import { AxiosRequestConfig } from "axios";
import { ExamSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";

export interface UpdateExamScheduleParams extends ExamSchedule {
  token: string;
  imageFileList: ImageFile[];
}

interface UpdateExamScheduleResponse {
  message: string;
  data: ExamSchedule;
}

export const updateExamSchedule = async (
  params: UpdateExamScheduleParams
): Promise<UpdateExamScheduleResponse> => {
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
    const response = await axiosInstance(config).put(`/examSchedule`, formData);

    return response.data;
  } catch (error) {
    throw new Error(`updateExamSchedule failed by ${error}`);
  }
};
