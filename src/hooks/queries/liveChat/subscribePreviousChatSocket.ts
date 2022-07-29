import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

interface SubscribeGetPreviousChatListSocketParams {
  socketRef?: React.MutableRefObject<Socket | undefined>;
  roomId?: string;
  userId?: string;
  queryClient: QueryClient;
}

export const subscribePreviousChatSocket = ({
  socketRef,
  roomId,
  userId,
  queryClient,
}: SubscribeGetPreviousChatListSocketParams): EffectCallback => {
  return () => {
    if (!socketRef?.current) return;
    socketRef.current.on(`previousChatList_${roomId}_${userId}`, (res) => {
      console.log("socket response", res);
      queryClient.setQueriesData<ChatElement[]>(
        ["liveChat", roomId],
        (oldChatListData) => {
          if (!oldChatListData) return [...res.data];
          return [...res.data];
        }
      );
    });

    return () => {
      if (!socketRef?.current) return;
      socketRef.current.off(`previousChatList_${roomId}_${userId}`);
    };
  };
};
