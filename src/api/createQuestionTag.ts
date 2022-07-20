import { AxiosRequestConfig } from "axios";
import { FilterOption } from "../commonElements/FilterOptionHandler";
import { RoomParams } from "../commonElements/RoomList";
import { QuestionTag } from "../models";
import axiosInstance from "./axiosInstance";

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
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
