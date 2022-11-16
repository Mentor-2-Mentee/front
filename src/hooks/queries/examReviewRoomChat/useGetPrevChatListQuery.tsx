import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { Chat } from "../../../commonElements/LiveChat";
import queryClient from "../queryClientInit";

interface ApiParams {
  token?: string;
  examReviewRoomId: number;
  oldestChatId?: number;
  limit?: number;
}

interface ApiResponse {
  message: string;
  chatList: Chat[];
}

const getPrevChatList = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).get<ApiResponse>(
    `/exam-review-room-chat?examReviewRoomId=${
      params.examReviewRoomId
    }&oldestChatId=${params.oldestChatId || -1}&limit=${params.limit || 10}`
  );
  return data.chatList;
};

const updater = (oldChatList: Chat[], newChatList: Chat[]) => {
  const sumedSet = new Set([...newChatList, ...oldChatList]);
  return [...sumedSet];
};

export const useGetPrevChatListQuery = (params: ApiParams) =>
  useQuery(
    [
      "examReviewRoom",
      "prevChat",
      params.examReviewRoomId,
      params.oldestChatId,
    ],
    () => getPrevChatList({ ...params }),
    {
      onSuccess: (newChatList) => {
        queryClient.setQueriesData<Chat[]>(
          ["examReviewRoom", "chatList", params.examReviewRoomId],
          (oldChatList = []) => updater(oldChatList, newChatList)
        );
      },
    }
  );
