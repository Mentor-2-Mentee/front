import { AxiosRequestConfig } from "axios";
import { QuestionTag } from "../../models";
import axiosInstance from "../axiosInstance";

interface CreateQuestionTagParams {
  token: string;
  parentTag?: string;
  tagName: string;
}

interface CreateQuestionTagReaponse {
  data: QuestionTag[];
}

export const createQuestionTag = async (
  params: CreateQuestionTagParams
): Promise<CreateQuestionTagReaponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).post(`/question-tag`, params);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
