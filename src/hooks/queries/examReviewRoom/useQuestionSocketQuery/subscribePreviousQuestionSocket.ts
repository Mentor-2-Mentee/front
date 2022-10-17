import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache, ExamQuestion } from "..";

interface subscribePreviousQuestionSocketParams {
  id?: string;
  examScheduleId?: string;
  examType?: string;
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

export const subscribePreviousQuestionSocket = ({
  id,
  examScheduleId,
  examType,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: subscribePreviousQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_prev-${examScheduleId}_${examType}_${id}`;
  console.log("subscribeChannel", subscribeChannel);
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!id || !examScheduleId || !examType) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData<ExamReviewRoomQueryCache>(
        ["examReviewRoom", examScheduleId, examType, "question"],
        (oldData?: ExamReviewRoomQueryCache) => updater(response, oldData)
      );

      console.log("response", response);
      window.clearInterval(response.timer);
    });
    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
