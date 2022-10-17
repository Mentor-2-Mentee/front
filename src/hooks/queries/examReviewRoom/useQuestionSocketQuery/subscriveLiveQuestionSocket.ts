import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache, ExamQuestion } from "..";

interface SubscribeLiveQuestionSocketParams {
  examScheduleId?: string;
  examType?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface SocketResponse {
  id: number;
  examScheduleId: string;
  examType: string;
  nowQuestionIndex: number;
  examQuestionData: ExamQuestion;
}

const updater = (
  response: SocketResponse,
  oldData?: ExamReviewRoomQueryCache
): ExamReviewRoomQueryCache => {
  if (!oldData) {
    return {
      examQuestionList: [response.examQuestionData],
      liveWrittingUser: [response.id],
    };
  }

  const isAlreadyWritting = Boolean(
    oldData.liveWrittingUser.findIndex(
      (oldUserId) => oldUserId === response.id
    ) !== -1
  );

  const newCacheData: ExamReviewRoomQueryCache = {
    examQuestionList: oldData.examQuestionList.map((oldQuestionData) => {
      if (
        oldQuestionData.examQuestionId ===
        response.examQuestionData.examQuestionId
      ) {
        return response.examQuestionData;
      }
      return oldQuestionData;
    }),
    liveWrittingUser: isAlreadyWritting
      ? oldData.liveWrittingUser
      : [...oldData.liveWrittingUser, response.id],
  };

  return newCacheData;
};

export const subscribeLiveQuestionSocket = ({
  examScheduleId,
  examType,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeLiveQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_live-${examScheduleId}_${examType}`;
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
