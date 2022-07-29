import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheData } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat";

interface SubscribeSendChatSocketParams {
  socketRef?: React.MutableRefObject<Socket | undefined>;
  roomId?: string;
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
      console.log("chat res", res, queryClient);
      queryClient.setQueryData<ChatSocketCacheData>(
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
  };
};
