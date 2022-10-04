import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { LiveCanvasCacheDataEntitiy } from ".";
import { CanvasToolOption } from "../../../pages/RoomPage/DrawArea";
import { Stroke } from "../../../pages/RoomPage/DrawArea/Canvas";

interface SubscribeLiveCanvasSocket {
  roomId?: string;
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
}

export interface LiveCanvasResponse {
  userId: string;
  stroke: Stroke;
  canvasToolOption: CanvasToolOption;
}

const updater = (
  newData: LiveCanvasResponse,
  oldData?: LiveCanvasCacheDataEntitiy
): LiveCanvasCacheDataEntitiy => {
  if (!oldData) {
    return {
      otherUserStrokeList: [newData],
    };
  }

  return {
    otherUserStrokeList: [...oldData.otherUserStrokeList, newData],
  };
};

export const subscribeLiveCanvasSocket = ({
  roomId,
  socketRef,
  queryClient,
  subscribeChannelListRef,
}: SubscribeLiveCanvasSocket): EffectCallback => {
  const subscribeChannel = `mentoringRoom_canvas_stroke_live-${roomId}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!roomId) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: LiveCanvasResponse) => {
      queryClient.setQueryData<LiveCanvasCacheDataEntitiy>(
        ["liveCanvas", roomId],
        (oldData) => updater(response, oldData)
      );
    });
    subscribeChannelListRef.current.push(subscribeChannel);

    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
