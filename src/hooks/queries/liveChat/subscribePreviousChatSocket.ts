import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheEntity } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import { updateOldChatData } from "./updateOldChatData";

interface SubscribeGetPreviousChatListSocketParams {
  roomId?: string;
  userId?: string;
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

export interface PreviousChatResponse {
  latestChatIndex: number;
  previousChatListData: ChatElement[];
  targetTimeStamp: string;
  sendTime: number;
}

export const subscribePreviousChatSocket = ({
  roomId,
  userId,
  socketRef,
  queryClient,
}: SubscribeGetPreviousChatListSocketParams): EffectCallback => {
  return () => {
    if (!roomId || !userId) return;
    console.log("subscribePreviousChatSocket");

    socketRef.current?.on(
      `previousChatList_${roomId}_${userId}`,
      (res: PreviousChatResponse) => {
        console.log("previousChatList_", res);
        queryClient.setQueriesData<ChatSocketCacheEntity>(
          ["liveChat", roomId],
          (oldData) => {
            if (!oldData) {
              console.log("초기데이터없음");
              return {
                latestChatIndex: res.latestChatIndex,
                chatList: res.previousChatListData,
              };
            }

            return updateOldChatData({
              oldData,
              insertData: res,
            });
          }
        );
        window.clearInterval(res.sendTime);
      }
    );

    return () => {
      socketRef.current?.off(`previousChatList_${roomId}_${userId}`);
    };
  };
};
