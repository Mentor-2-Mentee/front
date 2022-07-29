import { FilterOption } from "../commonElements/FilterOptionHandler";
import { RoomParams } from "../commonElements/RoomList";
import { ChatElement } from "../pages/RoomPage/LiveChat/LiveChatElement";
import axiosInstance from "./axiosInstance";

export interface GetPastChatListParams {
  page: number;
  userId?: string;
  roomId?: string;
}

export interface GetPastChatListResponse {
  data: ChatElement[];
  previousPage?: number;
}

export const getPastChatList = async ({
  page,
  userId,
  roomId,
}: GetPastChatListParams): Promise<GetPastChatListResponse> => {
  try {
    const response = await axiosInstance().get(
      `/live-chat?page=${page}&userId=${userId}&roomId=${roomId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getPastChatList failed by ${error}`);
  }
};
