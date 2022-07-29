import { EffectCallback } from "react";
import { QueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat";

interface SubscribeGetPreviousChatListSocketParams {
  socket?: Socket;
  roomId?: string;
  userId?: string;
  queryClient: QueryClient;
}

export const subscribeGetPreviousChatListSocket = ({
  socket,
  roomId,
  userId,
  queryClient,
}: SubscribeGetPreviousChatListSocketParams): EffectCallback => {
  return () => {
    if (!socket) return;
    socket.on(`previousChatList_${roomId}_${userId}`, (res) => {
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
      socket.off(`previousChatList_${roomId}_${userId}`);
    };
  };
};
