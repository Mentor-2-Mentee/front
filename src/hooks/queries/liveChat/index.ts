import { useEffect } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { Socket } from "socket.io-client";

import {
  emitPreviousChatListRequest,
  GetPreviousChatListQueryParams,
} from "./emitPreviousChatListRequest";
import { emitChat } from "./emitChat";
import { subscribePreviousChatSocket } from "./subscribePreviousChatSocket";
import { subscribeLiveChatSocket } from "./subscribeLiveChatSocket";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export interface UseChatSocketQueryParams {
  roomId?: string;
  userId?: string;
  socketRef?: React.MutableRefObject<Socket | undefined>;
}
export interface ChatSocketCacheEntity {
  latestChatIndex: number;
  chatList: ChatElement[];
}

export interface ChatSocketEmitter {
  sendChat: (socketQueryData: ChatElement) => void;
  getPreviousChatList: (
    socketQueryData: GetPreviousChatListQueryParams
  ) => void;
}

export const chatSocketQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const useChatSocketQuery = ({
  roomId,
  userId,
  socketRef,
}: UseChatSocketQueryParams): ChatSocketEmitter => {
  const queryClient = useQueryClient();

  useEffect(
    subscribePreviousChatSocket({
      roomId,
      userId,
      socketRef,
      queryClient,
    }),
    [roomId, userId, socketRef, queryClient]
  );
  useEffect(
    subscribeLiveChatSocket({
      roomId,
      socketRef,
      queryClient,
    }),
    [roomId, socketRef, queryClient]
  );

  return {
    sendChat: (socketQueryData: ChatElement) =>
      emitChat(socketQueryData, socketRef),
    getPreviousChatList: (socketQueryData: GetPreviousChatListQueryParams) =>
      emitPreviousChatListRequest(socketQueryData, socketRef),
  };
};
