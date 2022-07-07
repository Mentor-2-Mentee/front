import { AxiosRequestConfig } from "axios";
import { AppliedOptions } from "../commonElements/FilterOptionHandler";
import { ImageFile } from "../pages/CreateRoomPage/ImageUpload";
import axiosInstance from "./axiosInstance";

interface PostNewQuestionRoomRequestParams {
  token: string;
  roomTitle: string;
  appliedTagOptions: Omit<AppliedOptions, "filterKeywords">;
  explainRoomText?: string;
  imageFileList: ImageFile[];
}

interface PostNewQuestionRoomResponseParams {
  pathId: string;
}

export const postNewQuestionRoom = async (
  params: PostNewQuestionRoomRequestParams
): Promise<PostNewQuestionRoomResponseParams> => {
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

  params.imageFileList.map((imageFile) => {
    formData.append("image[]", imageFile.fileData, imageFile.fileName);
  });

  try {
    const response = await axiosInstance(config).post("/live-rooms", formData);
    return response.data;
  } catch (error) {
    throw `post new question room error : ${error}`;
  }
};
