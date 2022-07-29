import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketQueryData } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat";

interface SubscribeSendChatSocketParams {
  socket?: Socket;
  roomId?: string;
  queryClient: QueryClient;
}

interface SendChatResponse extends ChatSocketQueryData {
  receivedChatData: ChatElement;
}

export const subscribeSendChatSocket = ({
  socket,
  roomId,
  queryClient,
}: SubscribeSendChatSocketParams): EffectCallback => {
  return () => {
    if (!socket) return;
    socket.on(`chatToClient_${roomId}`, (res: SendChatResponse) => {
      queryClient.setQueriesData<ChatSocketQueryData>(
        ["liveChat", roomId],
        (oldChatListData) => {
          if (!oldChatListData) {
            return {
              data: [res.receivedChatData],
              lastChatIndex: res.lastChatIndex,
            };
          }

          return {
            data: [...oldChatListData.data, res.receivedChatData],
            lastChatIndex: res.lastChatIndex,
          };
        }
      );
    });
  };
};
