import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { LiveChatCacheDataEntitiy, UseChatSocketQueryParams } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

interface SubscribeSendChatSocketParams
  extends Pick<UseChatSocketQueryParams, "roomId"> {
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

export interface LiveChatResponse {
  latestChatIndex: number;
  receivedChatData: ChatElement;
}

const updater = (
  newData: LiveChatResponse,
  oldData?: LiveChatCacheDataEntitiy
) => {
  if (!oldData) {
    return {
      latestChatIndex: newData.latestChatIndex,
      chatList: [newData.receivedChatData],
    };
  }
  const latestIndex = Math.max(
    oldData.latestChatIndex,
    newData.latestChatIndex
  );
  const isAlreadyIn = oldData.chatList.findIndex(
    (chatElement) =>
      chatElement.createdAt === newData.receivedChatData.createdAt
  );

  if (isAlreadyIn !== -1) return;
  return {
    latestChatIndex: latestIndex,
    chatList: [...oldData.chatList, newData.receivedChatData],
  };
};

export const subscribeLiveChatSocket = ({
  roomId,
  socketRef,
  queryClient,
}: SubscribeSendChatSocketParams): EffectCallback => {
  const subscribeChannel = `mentoringRoom_chat_live-${roomId}`;
  console.log(`mentoringRoom_chat_live-${roomId}`);
  return () => {
    if (!roomId) return;
    socketRef.current?.on(subscribeChannel, (response: LiveChatResponse) => {
      queryClient.setQueryData<LiveChatCacheDataEntitiy>(
        ["liveChat", roomId],
        (oldData) => updater(response, oldData)
      );
    });

    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
