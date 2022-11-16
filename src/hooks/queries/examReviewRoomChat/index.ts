import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Chat } from "../../../commonElements/LiveChat";
import { emitChat, EmitChatParams } from "./emitChat";
import { subscribeLiveChatSocket } from "./subscribeLiveChatSocket";

interface SocketQueryParams {
  examReviewRoomId: number;
}

export const useExamReviewRoomChatSocketQuery = ({
  examReviewRoomId,
}: SocketQueryParams) => {
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env.VITE_APP_SOCKETURL}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(
    subscribeLiveChatSocket({ examReviewRoomId, queryClient, socketRef }),
    [examReviewRoomId, queryClient, socketRef]
  );

  return {
    sendChat: (params: EmitChatParams) => emitChat(params, socket),
  };
};
