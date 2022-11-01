import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache } from "..";
import { ExamQuestion } from "../../examQuestion";

interface SubscribeLiveQuestionSocketParams {
  examReviewRoomId?: number;
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
      if (oldQuestionData.id === response.examQuestionData.id) {
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
  examReviewRoomId,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeLiveQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_live-${examReviewRoomId}`;
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
