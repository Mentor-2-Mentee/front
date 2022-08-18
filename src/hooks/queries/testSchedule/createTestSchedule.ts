import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

export const createTestSchedule = async (params: any): Promise<any> => {
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

    params.imageFileList.map((imageFile: any) => {
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
