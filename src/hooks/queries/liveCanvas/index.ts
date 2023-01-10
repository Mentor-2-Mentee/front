import { useCallback, useEffect, useRef } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { CanvasToolOption } from "../../../pages/RoomPage/DrawArea";
import { Stroke } from "../../../pages/RoomPage/DrawArea/Canvas";
import { emitStroke } from "./emitStroke";
import {
  LiveCanvasResponse,
  subscribeLiveCanvasSocket,
} from "./subscribeLiveCanvasSocket";

interface UseCanvasSocketQueryParams {
  roomId?: string;
  id?: string;
}

export type SendCanvasStroke = (
  stroke: Stroke,
  canvasToolOption: CanvasToolOption
) => void;

export interface CanvasSocketEmitter {
  sendCanvasStroke: SendCanvasStroke;
}

export interface LiveCanvasCacheDataEntitiy {
  otherUserStrokeList: LiveCanvasResponse[];
}

export const canvasSocketQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const useCanvasSocketQuery = ({
  roomId,
  id,
}: UseCanvasSocketQueryParams): CanvasSocketEmitter => {
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env["VITE_APP_SOCKETURL"]}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const subscribeChannelListRef = useRef<string[]>([]);
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(
    subscribeLiveCanvasSocket({
      roomId,
      socketRef,
      queryClient,
      subscribeChannelListRef,
    }),
    [id, queryClient]
  );

  const emitStrokeCallBack = useCallback(
    (stroke: Stroke, canvasToolOption: CanvasToolOption) =>
      emitStroke({ stroke, canvasToolOption, roomId, id }, socket),
    [id, socket]
  );

  return {
    sendCanvasStroke: (stroke, canvasToolOption) =>
      emitStrokeCallBack(stroke, canvasToolOption),
  };
};
