import { QueryClient } from "@tanstack/react-query";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";
import { Chat } from "../../../commonElements/LiveChat";

interface SocketParams {
  examReviewRoomId: number;
  socket: Socket;
  queryClient: QueryClient;
}

const updater = (oldChatList: Chat[], newChat: Chat) => {
  const sumedSet = new Set([...oldChatList, newChat]);
  return [newChat, ...oldChatList];
};

export const subscribeLiveChatSocket = ({
  examReviewRoomId,
  socket,
  queryClient,
}: SocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_chat_live-${examReviewRoomId}`;

  return () => {
    socket.on(subscribeChannel, (newChat: Chat) => {
      queryClient.setQueriesData<Chat[]>(
        ["examReviewRoom", "chatList", examReviewRoomId],
        (oldChatList = []) => updater(oldChatList, newChat)
      );
    });

    return () => {
      socket.close();
    };
  };
};
