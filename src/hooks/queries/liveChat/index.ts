import { memo, useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import { ChatElement } from "../../../pages/RoomPage/LiveChat";
import { getPreviousChatList } from "./getPreviousChatList";
import { sendChat } from "./sendChat";
import { subscribePreviousChatSocket } from "./subscribePreviousChatSocket";
import { subscribeLiveChatSocket } from "./subscribeLiveChatSocket";

export type ChatSocketQueryType = "SEND_CHAT" | "GET_PREVIOUS_MESSAGE";

interface UseChatSocketQueryParams {
  roomId?: string;
  userId?: string;
  socketRef?: React.MutableRefObject<Socket | undefined>;
}

export interface ChatSocketCacheData {
  latestChatIndex: number;
  chatList: ChatElement[];
}

export type ChatSocketEmiter = (
  socketQueryType: ChatSocketQueryType,
  socketQuerys: any
) => void;

export const useChatSocketQuery = ({
  roomId,
  userId,
  socketRef,
}: UseChatSocketQueryParams): ChatSocketEmiter => {
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

  return (socketQueryType: ChatSocketQueryType, socketQuerys: any) => {
    switch (socketQueryType) {
      case "SEND_CHAT":
        sendChat(socketQuerys, socketRef?.current);
        break;

      case "GET_PREVIOUS_MESSAGE":
        getPreviousChatList(socketQuerys, socketRef?.current);
      default:
        break;
    }
  };
};
