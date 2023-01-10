import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { emitChat, EmitChatParams } from "./emitChat";
import { subscribeLiveChatSocket } from "./subscribeLiveChatSocket";

interface SocketQueryParams {
  examReviewRoomId: number;
  socket: Socket;
}

export const useExamReviewRoomChatSocketQuery = ({
  examReviewRoomId,
  socket,
}: SocketQueryParams) => {
  const queryClient = useQueryClient();

  useEffect(
    subscribeLiveChatSocket({
      examReviewRoomId,
      queryClient,
      socket,
    }),
    [examReviewRoomId, queryClient, socket]
  );

  return {
    sendChat: (params: EmitChatParams) => emitChat(params, socket),
  };
};
