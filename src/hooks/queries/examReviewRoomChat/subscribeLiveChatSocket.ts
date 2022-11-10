import { QueryClient } from "@tanstack/react-query";
import { id } from "date-fns/locale";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";

interface SocketParams {
  examReviewRoomId: number;
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

interface SocketResponse {}

export const subscribeLiveChatSocket = ({
  examReviewRoomId,
  socketRef,
  queryClient,
}: SocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_chat_live-${examReviewRoomId}`;

  return () => {
    if (!socketRef.current) return;
    socketRef.current.on(subscribeChannel, (response: SocketResponse) => {
      // queryClient.setQueryData
      console.log("recevied socketData", response);
    });

    return () => {
      if (!socketRef.current) return;
      socketRef.current.off(subscribeChannel);
    };
  };
};
