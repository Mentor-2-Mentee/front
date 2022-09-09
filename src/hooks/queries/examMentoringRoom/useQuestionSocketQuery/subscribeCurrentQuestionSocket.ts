import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

interface subscribeCurrentQuestionSocketParams {
  userId?: string;
  examScheduleId?: string;
  examField?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface CurrentQuestionResponse {
  timer: number;
}

const updater = (response: any, oldData: any): any => {
  console.log("get Data", response);
  return response;
};

export const subscribeCurrentQuestionSocket = ({
  userId,
  examScheduleId,
  examField,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: subscribeCurrentQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examMentoringRoom_question_current-${examScheduleId}_${examField}_${userId}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!userId || !examScheduleId || !examField) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: any) => {
      queryClient.setQueryData<any>(
        ["examMentoringRoom", examScheduleId, examField, "question"],
        (oldData: any) => updater(response, oldData)
      );

      window.clearInterval(response.timer);
    });
    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
