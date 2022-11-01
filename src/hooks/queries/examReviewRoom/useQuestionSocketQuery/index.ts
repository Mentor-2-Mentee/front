import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ExamQuestion } from "../../examQuestion";
import { emitPreviousQuestionRequest } from "./emitPreviousQuestionRequest";
import { subscribePreviousQuestionSocket } from "./subscribePreviousQuestionSocket";
import { subscribeLiveQuestionSocket } from "./subscriveLiveQuestionSocket";
import { subscriveQuestionOptionSocket } from "./subscriveQuestionOptionSocket";

interface UseQuestionSocketQueryParams {
  id?: string;
  examReviewRoomId: number;
}

export const useQuestionSocketQuery = ({
  id,
  examReviewRoomId,
}: UseQuestionSocketQueryParams) => {
  const queryClient = useQueryClient();
  const socket = io(`${import.meta.env.VITE_APP_SOCKETURL}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });
  const subscribeChannelListRef = useRef<string[]>([]);
  const socketRef = useRef<Socket>();
  socketRef.current = socket;

  useEffect(
    subscribePreviousQuestionSocket({
      id,
      examReviewRoomId,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [id, examReviewRoomId, queryClient, subscribeChannelListRef, socketRef]
  );

  useEffect(
    subscribeLiveQuestionSocket({
      examReviewRoomId,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examReviewRoomId, queryClient, subscribeChannelListRef, socketRef]
  );

  useEffect(
    subscriveQuestionOptionSocket({
      examReviewRoomId,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examReviewRoomId, queryClient, subscribeChannelListRef, socketRef]
  );

  const sendChangeData = useCallback(
    (nowQuestionIndex: number, updateExamQuestionData: ExamQuestion) => {
      socket.emit("examReviewRoom_question_live", {
        userId: id,
        examReviewRoomId,
        nowQuestionIndex,
        updateExamQuestionData,
      });
    },
    [id, examReviewRoomId, socket]
  );

  const sendChangeQuestionCount = useCallback(
    (currentCount: number, newCount: number) => {
      socket.emit("examReviewRoom_question_option", {
        userId: id,
        examReviewRoomId,
        setQuestionCount: {
          currentCount,
          newCount,
        },
      });
    },
    [id, examReviewRoomId, socket]
  );

  const sendDeleteQuestion = useCallback(
    (examQuestionId: number) => {
      socket.emit("examReviewRoom_question_option", {
        userId: id,
        examReviewRoomId,
        deleteExamQuestionId: examQuestionId,
      });
    },
    [id, examReviewRoomId, socket]
  );

  const getPreviousQuestion = useCallback(
    (timer: number) => {
      emitPreviousQuestionRequest(
        {
          userId: id,
          examReviewRoomId,
          timer,
        },
        socket
      );
    },
    [id, examReviewRoomId, socket]
  );

  return {
    getPreviousQuestion,
    sendChangeData,
    sendChangeQuestionCount,
    sendDeleteQuestion,
  };
};

export const useLiveQuestionQuery = (examReviewRoomId?: number) =>
  useQuery<{
    examQuestionList: ExamQuestion[];
    liveWrittingUser: number[];
  }>(["examReviewRoom", examReviewRoomId, "question"]);
