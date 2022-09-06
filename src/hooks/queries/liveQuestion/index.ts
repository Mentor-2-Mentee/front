import { QueryClient } from "@tanstack/query-core";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const questionSocketQueryClient = new QueryClient();

export const useQuestionSocketQuery = () => {
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env.VITE_APP_SOCKETURL}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const subscribeChannelListRef = useRef<string[]>([]);
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(() => {}, [queryClient]);
};
