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

const updater = (currentChatList: Chat[], olderChatList: Chat[]) => {
  const newChatList = [...currentChatList];
  for (const olderChat of olderChatList) {
    const isExist = Boolean(
      newChatList.findIndex((chat) => chat.id === olderChat.id) !== -1
    );
    if (isExist) continue;
    newChatList.push(olderChat);
  }
  newChatList.sort((leftChat, rightChat) => rightChat.id - leftChat.id);

  return newChatList;
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
