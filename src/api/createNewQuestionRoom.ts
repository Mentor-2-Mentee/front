import { AxiosRequestConfig } from "axios";
import { FilterOption } from "../commonElements/FilterOptionHandler";
import { ImageFile } from "../commonElements/ImageUpload";
import axiosInstance from "./axiosInstance";

interface CreateNewQuestionRoomRequestParams {
  token: string;
  roomTitle: string;
  appliedTagOptions: Omit<FilterOption, "filterKeywords">;
  explainRoomText?: string;
  imageFileList: ImageFile[];
}

interface CreateNewQuestionRoomResponseParams {
  url: string;
}

export const createNewQuestionRoom = async (
  params: CreateNewQuestionRoomRequestParams
): Promise<CreateNewQuestionRoomResponseParams> => {
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

    params.imageFileList.map((imageFile) => {
      formData.append("image[]", imageFile.fileData, imageFile.fileName);
    });
    const response = await axiosInstance(config).post("/live-rooms", formData);
    return response.data;
  } catch (error) {
    throw `Create new question room error : ${error}`;
  }
};
