// import { QuestionTag } from "../models";
import { QuestionTag } from "../hooks/queries/questionTag";
import axiosInstance from "./axiosInstance";

interface GetQuestionTagListResponse {
  data: QuestionTag[];
}

export const getQuestionTagList =
  async (): Promise<GetQuestionTagListResponse> => {
    try {
      const response = await axiosInstance().get(`/question-tag`);
      return response.data;
    } catch (error) {
      throw new Error(`getLiveRoomList failed by ${error}`);
    }
  };
