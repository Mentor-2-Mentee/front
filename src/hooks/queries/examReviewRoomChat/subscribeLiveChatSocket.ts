import { QueryClient } from "@tanstack/react-query";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";
import { Chat } from "../../../commonElements/LiveChat";

interface SocketParams {
  examReviewRoomId: number;
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

const updater = (oldChatList: Chat[], newChat: Chat) => {
  const sumedSet = new Set([...oldChatList, newChat]);
  return [...sumedSet];
};

export const subscribeLiveChatSocket = ({
  examReviewRoomId,
  socketRef,
  queryClient,
}: SocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_chat_live-${examReviewRoomId}`;

  return () => {
    if (!socketRef.current) return;
    socketRef.current.on(subscribeChannel, (newChat: Chat) => {
      queryClient.setQueriesData<Chat[]>(
        ["examReviewRoom", "chatList", examReviewRoomId],
        (oldChatList = []) => updater(oldChatList, newChat)
      );
    });

    return () => {
      if (!socketRef.current) return;
      socketRef.current.off(subscribeChannel);
    };
  };
};
