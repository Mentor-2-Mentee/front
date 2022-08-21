import { AxiosRequestConfig } from "axios";
import { TestSchedule } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";

export interface UpdateTestScheduleParams extends TestSchedule {
  token: string;
  imageFileList: ImageFile[];
}

interface UpdateTestScheduleResponse {
  message: string;
  data: TestSchedule;
}

export const updateTestSchedule = async (
  params: UpdateTestScheduleParams
): Promise<UpdateTestScheduleResponse> => {
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
    const response = await axiosInstance(config).put(`/testSchedule`, formData);

    return response.data;
  } catch (error) {
    throw new Error(`updateTestSchedule failed by ${error}`);
  }
};
