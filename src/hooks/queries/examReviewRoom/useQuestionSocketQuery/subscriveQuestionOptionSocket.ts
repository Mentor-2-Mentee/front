import { QueryClient } from "@tanstack/query-core";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache, ExamQuestion } from "..";

interface SubscribeQuestionOptionSocketParams {
  examScheduleId?: string;
  examType?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface SocketResponse {
  id: number;
  examScheduleId: number;
  examType: string;
  examQuestionList: ExamQuestion[];
}

const updater = (
  response: SocketResponse,
  oldData?: ExamReviewRoomQueryCache
): ExamReviewRoomQueryCache => {
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
  examType,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeQuestionOptionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_option-${examScheduleId}_${examType}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!examScheduleId || !examType) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData(
        ["examReviewRoom", examScheduleId, examType, "question"],
        (oldData?: ExamReviewRoomQueryCache) => updater(response, oldData)
      );
    });

    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
