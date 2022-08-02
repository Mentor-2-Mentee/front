import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheEntity, UseChatSocketQueryParams } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

interface SubscribeSendChatSocketParams {
  roomId?: string;
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

export interface LiveChatResponse {
  latestChatIndex: number;
  receivedChatData: ChatElement;
}

export const subscribeLiveChatSocket = ({
  roomId,
  socketRef,
  queryClient,
}: SubscribeSendChatSocketParams): EffectCallback => {
  return () => {
    if (!roomId) return;
    console.log("subscribeLiveChatSocket");
    socketRef.current?.on(`chatToClient_${roomId}`, (res: LiveChatResponse) => {
      console.log("채팅응답", res);
      queryClient.setQueryData<ChatSocketCacheEntity>(
        ["liveChat", roomId],
        (oldData) => {
          if (!oldData) {
            return {
              latestChatIndex: res.latestChatIndex,
              chatList: [res.receivedChatData],
            };
          }
          const latestIndex = Math.max(
            oldData.latestChatIndex,
            res.latestChatIndex
          );
          const isAlreadyIn = oldData.chatList.findIndex(
            (chatElement) =>
              chatElement.createdAt === res.receivedChatData.createdAt
          );

          if (isAlreadyIn !== -1) return;
          return {
            latestChatIndex: latestIndex,
            chatList: [...oldData.chatList, res.receivedChatData],
          };
        }
      );
    });

    return () => {
      socketRef.current?.off(`chatToClient_${roomId}`);
    };
  };
};
