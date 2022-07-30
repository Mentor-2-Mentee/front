import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatSocketCacheEntity } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import { updateOldChatData } from "./updateOldChatData";

interface SubscribeGetPreviousChatListSocketParams {
  socketRef?: React.MutableRefObject<Socket | undefined>;
  roomId?: string;
  userId?: string;
  queryClient: QueryClient;
}

export interface PreviousChatResponse {
  latestChatIndex: number;
  previousChatListData: ChatElement[];
  targetTimeStamp: string;
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
              console.log("초기데이터없음");
              return {
                latestChatIndex: res.latestChatIndex,
                chatList: res.previousChatListData,
              };
            }

            //중복해서 들어가지않도록 넣는로직 필요
            return updateOldChatData({
              oldData,
              insertData: res,
            });
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
