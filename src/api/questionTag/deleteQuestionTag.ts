import { AxiosRequestConfig } from "axios";
import { QuestionTag } from "../../hooks/queries/questionTag";

import axiosInstance from "../axiosInstance";

interface DeleteQuestionTagParams {
  token: string;
  parentTag?: string;
  tagName: string;
}

interface DeleteQuestionTagReaponse {
  data: QuestionTag[];
}

export const deleteQuestionTag = async (
  params: DeleteQuestionTagParams
): Promise<DeleteQuestionTagReaponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).delete(
      `/question-tag?tagname=${params.tagName}&parentTag=${params.parentTag}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
