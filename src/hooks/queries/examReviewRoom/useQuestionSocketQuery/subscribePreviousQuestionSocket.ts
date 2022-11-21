import { EffectCallback } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { ExamReviewRoomQueryCache } from "..";
import { ExamQuestion } from "../../examQuestion";

interface subscribePreviousQuestionSocketParams {
  id?: string;
  examReviewRoomId?: number;
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
  examReviewRoomId,
  queryClient,
  subscribeChannelListRef,
  socketRef,
}: subscribePreviousQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examReviewRoom_question_prev-${examReviewRoomId}_${id}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {
    if (!id || !examReviewRoomId) return;
    if (isSubscribed) return;
    socketRef.current?.on(subscribeChannel, (response: SocketResponse) => {
      queryClient.setQueryData<ExamReviewRoomQueryCache>(
        ["examReviewRoom", examReviewRoomId, "question"],
        (oldData?: ExamReviewRoomQueryCache) => updater(response, oldData)
      );
      window.clearTimeout(response.timer);
    });
    subscribeChannelListRef.current.push(subscribeChannel);
    return () => {
      socketRef.current?.off(subscribeChannel);
    };
  };
};
