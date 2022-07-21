import { FilterOption, FilterTag } from "../commonElements/FilterOptionHandler";
import { RoomParams } from "../commonElements/RoomList";
import axiosInstance from "./axiosInstance";

interface GetQuestionTagListResponse {
  data: FilterTag[];
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
