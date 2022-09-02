import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { LiveChatCacheDataEntitiy, UseChatSocketQueryParams } from ".";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import {
  GetPreviousChatListQueryParams,
  emitInitialPreviousChatDataIntervalRequest,
} from "./emitPreviousChatListRequest";
import { updateOldChatData } from "./updateOldChatData";

interface SubscribeGetPreviousChatListSocketParams
  extends UseChatSocketQueryParams {
  socketRef: React.MutableRefObject<Socket | undefined>;
  queryClient: QueryClient;
}

export interface PreviousChatResponse {
  latestChatIndex: number;
  previousChatListData: ChatElement[];
  targetTimeStamp: string;
  sendTime: number;
}

const updater = (
  newData: PreviousChatResponse,
  oldData?: LiveChatCacheDataEntitiy
) => {
  if (!oldData) {
    return {
      latestChatIndex: newData.latestChatIndex,
      chatList: newData.previousChatListData,
    };
  }

  return updateOldChatData({
    oldData,
    insertData: newData,
  });
};

export const subscribePreviousChatSocket = ({
  roomId,
  userId,
  socketRef,
  queryClient,
}: SubscribeGetPreviousChatListSocketParams): EffectCallback => {
  const subscribeChannel = `mentoringRoom_chatList_prev-${roomId}_${userId}`;
  return () => {
    if (!roomId || !userId) return;
    socketRef.current?.on(
      subscribeChannel,
      (response: PreviousChatResponse) => {
        queryClient.setQueriesData<LiveChatCacheDataEntitiy>(
          ["liveChat", roomId],
          (oldData) => updater(response, oldData)
        );
        window.clearInterval(response.sendTime);
      }
    );

    const getInitialPreviousChatDataConfig: Omit<
      GetPreviousChatListQueryParams,
      "sendTime"
    > = {
      roomId,
      userId,
      limit: 20,
      targetTimeStamp: "latest",
    };

    emitInitialPreviousChatDataIntervalRequest(
      socketRef,
      getInitialPreviousChatDataConfig
    );

    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
