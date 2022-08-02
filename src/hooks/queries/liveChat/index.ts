import { useCallback, useEffect, useRef } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { io, Socket } from "socket.io-client";

import {
  emitPreviousChatListRequest,
  GetPreviousChatListQueryParams,
} from "./emitPreviousChatListRequest";
import { emitChat } from "./emitChat";
import {
  PreviousChatResponse,
  subscribePreviousChatSocket,
} from "./subscribePreviousChatSocket";
import {
  subscribeLiveChatSocket,
  LiveChatResponse,
} from "./subscribeLiveChatSocket";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import { socketInstance } from "../../../api/socketInstance";
import { updateOldChatData } from "./updateOldChatData";

export interface UseChatSocketQueryParams {
  roomId?: string;
  userId?: string;
  // socketRef: React.MutableRefObject<Socket | undefined>;
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
  socketRef: React.MutableRefObject<Socket | undefined>;
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
}: UseChatSocketQueryParams): ChatSocketEmitter => {
  console.log("useChatSocketQuery실행");
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env.VITE_APP_SOCKETURL}/live-chat`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(
    subscribePreviousChatSocket({
      roomId,
      userId,
      socketRef,
      queryClient,
    }),
    [userId, queryClient]
  );
  useEffect(
    subscribeLiveChatSocket({
      roomId,
      socketRef,
      queryClient,
    }),
    [queryClient]
  );

  // const cbSendChat = useCallback(
  //   (chatData: ChatElement) => {
  //     emitChat(chatData, socketRef);
  //   },
  //   [socketRef]
  // );
  // const cbGetPreviousChatList = useCallback(
  //   (requestParams: GetPreviousChatListQueryParams) => {
  //     emitPreviousChatListRequest(requestParams, socketRef);
  //   },
  //   [socketRef]
  // );

  return {
    sendChat: (chatData: ChatElement) => emitChat(chatData, socket),
    getPreviousChatList: (requestParams: GetPreviousChatListQueryParams) =>
      emitPreviousChatListRequest(requestParams, socket),

    // sendChat: cbSendChat,
    // getPreviousChatList: cbGetPreviousChatList,
    socketRef,
  };
};
