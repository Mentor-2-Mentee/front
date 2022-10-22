import { QueryClient } from "@tanstack/query-core";
import { EffectCallback } from "react";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache, ExamQuestion } from "..";

interface SubscribeQuestionOptionSocketParams {
  examReviewRoomId?: number;
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
  examReviewRoomId,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeQuestionOptionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_option-${examReviewRoomId}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!examReviewRoomId) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData(
        ["examReviewRoom", examReviewRoomId, "question"],
        (oldData?: ExamReviewRoomQueryCache) => updater(response, oldData)
      );
    });

    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
