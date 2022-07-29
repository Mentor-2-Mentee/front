import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheEntity, UseChatSocketQueryParams } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

interface SubscribeSendChatSocketParams
  extends Omit<UseChatSocketQueryParams, "userId"> {
  queryClient: QueryClient;
}

interface LiveChatResponse {
  latestChatIndex: number;
  receivedChatData: ChatElement;
}

export const subscribeLiveChatSocket = ({
  socketRef,
  roomId,
  queryClient,
}: SubscribeSendChatSocketParams): EffectCallback => {
  return () => {
    if (!socketRef?.current) return;
    socketRef?.current.on(`chatToClient_${roomId}`, (res: LiveChatResponse) => {
      queryClient.setQueryData<ChatSocketCacheEntity>(
        ["liveChat", roomId],
        (oldData) => {
          if (!oldData) {
            return {
              latestChatIndex: res.latestChatIndex,
              chatList: [res.receivedChatData],
            };
          }
          return {
            latestChatIndex: res.latestChatIndex,
            chatList: [...oldData.chatList, res.receivedChatData],
          };
        }
      );
    });

    return () => {
      if (!socketRef?.current) return;
      socketRef.current.off(`chatToClient_${roomId}`);
    };
  };
};
