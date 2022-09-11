import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamMentoringRoomQueryCache, ExamQuestion } from "..";

interface subscribePreviousQuestionSocketParams {
  userId?: string;
  examScheduleId?: string;
  examField?: string;
  queryClient: QueryClient;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
  socketRef: React.MutableRefObject<Socket | undefined>;
}

interface SocketResponse {
  examQuestionList: ExamQuestion[];
  timer: number;
}

const updater = (
  response: SocketResponse,
  oldData?: ExamMentoringRoomQueryCache
): ExamMentoringRoomQueryCache => {
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

export const subscribePreviousQuestionSocket = ({
  userId,
  examScheduleId,
  examField,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: subscribePreviousQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examMentoringRoom_question_prev-${examScheduleId}_${examField}_${userId}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!userId || !examScheduleId || !examField) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData<ExamMentoringRoomQueryCache>(
        ["examMentoringRoom", examScheduleId, examField, "question"],
        (oldData?: ExamMentoringRoomQueryCache) => updater(response, oldData)
      );

      window.clearInterval(response.timer);
    });
    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
