import { AxiosRequestConfig } from "axios";
import { TestSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";

export interface CreateTestScheduleParams {
  token: string;
  testScheduleTitle: string;
  testUrl: string;
  testDate: Date | null;
  testField: string;
  imageFileList: ImageFile[];
  testDescription: string;
}

interface CreateTestScheduleResponse {
  message: string;
  data: TestSchedule;
}

export const createTestSchedule = async (
  params: CreateTestScheduleParams
): Promise<CreateTestScheduleResponse> => {
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
      `/testSchedule`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(`createTestSchedule failed by ${error}`);
  }
};
