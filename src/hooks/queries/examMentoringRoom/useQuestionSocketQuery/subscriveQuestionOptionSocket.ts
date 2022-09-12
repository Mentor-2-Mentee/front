import { QueryClient } from "@tanstack/query-core";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";
import { ExamMentoringRoomQueryCache, ExamQuestion } from "..";

interface SubscribeQuestionOptionSocketParams {
  examScheduleId?: string;
  examField?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface SocketResponse {
  userId: number;
  examScheduleId: number;
  examField: string;
  examQuestionList: ExamQuestion[];
}

const updater = (
  response: SocketResponse,
  oldData?: ExamMentoringRoomQueryCache
): ExamMentoringRoomQueryCache => {
  console.log("response", response);
  if (!oldData)
    return {
      examQuestionList: response.examQuestionList,
      liveWrittingUser: [],
    };

  return {
    ...oldData,
    examQuestionList: response.examQuestionList,
  };
};

export const subscriveQuestionOptionSocket = ({
  examScheduleId,
  examField,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeQuestionOptionSocketParams): EffectCallback => {
  const subscribeChannel = `examMentoringRoom_question_option-${examScheduleId}_${examField}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!examScheduleId || !examField) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData(
        ["examMentoringRoom", examScheduleId, examField, "question"],
        (oldData?: ExamMentoringRoomQueryCache) => updater(response, oldData)
      );
    });

    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
