import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import { ChatElement } from "../../../pages/RoomPage/LiveChat";
import { getPreviousChatList } from "./getPreviousChatList";
import { sendChat } from "./sendChat";
import { subscribeGetPreviousChatListSocket } from "./subscribeGetPreviousChatListSocket";
import { subscribeSendChatSocket } from "./subscribeSendChatSocket";

type ChatSocketQueryType = "SEND_CHAT" | "GET_PREVIOUS_MESSAGE";

interface UseChatSocketQueryParams {
  roomId?: string;
  userId?: string;
  socket?: Socket;
}

export interface ChatSocketQueryData {
  data: ChatElement[];
  lastChatIndex: number;
}

export const useChatSocketQuery = <T extends any>(
  params: UseChatSocketQueryParams
): ((socketQueryType: ChatSocketQueryType, socketQuerys: T) => void) => {
  const queryClient = useQueryClient();

  useEffect(
    subscribeGetPreviousChatListSocket({
      ...params,
      queryClient,
    }),
    [queryClient, params]
  );
  useEffect(
    subscribeSendChatSocket({
      roomId: params.roomId,
      socket: params.socket,
      queryClient,
    }),
    [params.roomId, params.socket, queryClient]
  );

  return (socketQueryType: ChatSocketQueryType, socketQuerys: T) => {
    switch (socketQueryType) {
      case "SEND_CHAT":
        sendChat(socketQuerys, params.socket);
        break;

      case "GET_PREVIOUS_MESSAGE":
        getPreviousChatList(socketQuerys, params.socket);
      default:
        break;
    }
  };
};
