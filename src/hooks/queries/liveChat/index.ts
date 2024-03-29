import { useEffect, useRef } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";

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
  id?: string;
}
export interface LiveChatCacheDataEntitiy {
  latestChatIndex: number;
  chatList: ChatElement[];
}

export interface ChatSocketEmitter {
  sendChat: (socketQueryData: ChatElement) => void;
  getPreviousChatList: (
    socketQueryData: GetPreviousChatListQueryParams
  ) => void;
}

export const chatSocketQueryClient = new QueryClient();

export const useChatSocketQuery = ({
  roomId,
  id,
}: UseChatSocketQueryParams): ChatSocketEmitter => {
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env["VITE_APP_SOCKETURL"]}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(
    subscribePreviousChatSocket({
      roomId,
      id,
      socketRef,
      queryClient,
    }),
    [id, queryClient]
  );
  useEffect(
    subscribeLiveChatSocket({
      roomId,
      socketRef,
      queryClient,
    }),
    [queryClient]
  );

  return {
    sendChat: (chatData: ChatElement) => emitChat(chatData, socket),
    getPreviousChatList: (requestParams: GetPreviousChatListQueryParams) =>
      emitPreviousChatListRequest(requestParams, socket),
  };
};
