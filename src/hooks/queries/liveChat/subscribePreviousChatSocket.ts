import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheEntity } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

interface SubscribeGetPreviousChatListSocketParams {
  socketRef?: React.MutableRefObject<Socket | undefined>;
  roomId?: string;
  userId?: string;
  queryClient: QueryClient;
}

interface PreviousChatResponse {
  latestChatIndex: number;
  previousChatListData: ChatElement[];
}

export const subscribePreviousChatSocket = ({
  socketRef,
  roomId,
  userId,
  queryClient,
}: SubscribeGetPreviousChatListSocketParams): EffectCallback => {
  return () => {
    if (!socketRef?.current) return;
    socketRef.current.on(
      `previousChatList_${roomId}_${userId}`,
      (res: PreviousChatResponse) => {
        console.log("previousChatList_", res);
        queryClient.setQueriesData<ChatSocketCacheEntity>(
          ["liveChat", roomId],
          (oldData) => {
            if (!oldData) {
              return {
                latestChatIndex: res.latestChatIndex,
                chatList: res.previousChatListData,
              };
            }

            //중복해서 들어가지않도록 넣는로직 필요
            return {
              latestChatIndex: res.latestChatIndex,
              chatList: [...res.previousChatListData, ...oldData.chatList],
            };
          }
        );
      }
    );

    return () => {
      if (!socketRef?.current) return;
      socketRef.current.off(`previousChatList_${roomId}_${userId}`);
    };
  };
};
