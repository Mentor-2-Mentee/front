import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamMentoringRoomQueryCache, ExamQuestion } from "..";

interface SubscribeLiveQuestionSocketParams {
  examScheduleId?: string;
  examField?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface SocketResponse {
  userId: number;
  examScheduleId: string;
  examField: string;
  nowQuestionIndex: number;
  examQuestionData: ExamQuestion;
}

const updater = (
  response: SocketResponse,
  oldData?: ExamMentoringRoomQueryCache
): ExamMentoringRoomQueryCache => {
  // console.log(oldData, "get Live Data", response);

  if (!oldData) {
    console.log("기존 캐시데이터 확인불가");
    return {
      examQuestionList: [response.examQuestionData],
      liveWrittingUser: [response.userId],
    };
  }

  const isAlreadyWritting = Boolean(
    oldData.liveWrittingUser.findIndex(
      (oldUserId) => oldUserId === response.userId
    ) !== -1
  );

  const newCacheData: ExamMentoringRoomQueryCache = {
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
      : [...oldData.liveWrittingUser, response.userId],
  };

  return newCacheData;
};

export const subscribeLiveQuestionSocket = ({
  examScheduleId,
  examField,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: SubscribeLiveQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examMentoringRoom_question_live-${examScheduleId}_${examField}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!examScheduleId || !examField) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData<any>(
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
