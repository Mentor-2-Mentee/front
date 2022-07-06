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
  param: PostNewQuestionRoomRequestParams
): Promise<PostNewQuestionRoomResponseParams> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${param.token}`,
    },
  };
  const data: Omit<PostNewQuestionRoomRequestParams, "token"> = {
    roomTitle: param.roomTitle,
    appliedTagOptions: param.appliedTagOptions,
    explainRoomText: param.explainRoomText,
    imageFileList: param.imageFileList,
  };
  try {
    const response = await axiosInstance(config).post("/live-rooms", data);

    return response.data;
  } catch (error) {
    throw `post new question room error : ${error}`;
  }
};
