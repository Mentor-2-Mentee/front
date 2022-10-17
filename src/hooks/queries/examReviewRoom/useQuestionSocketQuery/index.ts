import { QueryClient } from "@tanstack/query-core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ExamQuestion } from "..";
import { emitPreviousQuestionRequest } from "./emitPreviousQuestionRequest";
import { subscribePreviousQuestionSocket } from "./subscribePreviousQuestionSocket";
import { subscribeLiveQuestionSocket } from "./subscriveLiveQuestionSocket";
import { subscriveQuestionOptionSocket } from "./subscriveQuestionOptionSocket";

interface UseQuestionSocketQueryParams {
  id?: string;
  examScheduleId?: string;
  examType?: string;
}

export const useQuestionSocketQuery = ({
  id,
  examScheduleId,
  examType,
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
      examScheduleId,
      examType,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [
      id,
      examScheduleId,
      examType,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    ]
  );

  useEffect(
    subscribeLiveQuestionSocket({
      examScheduleId,
      examType,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examScheduleId, examType, queryClient, subscribeChannelListRef, socketRef]
  );

  useEffect(
    subscriveQuestionOptionSocket({
      examScheduleId,
      examType,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examScheduleId, examType, queryClient, subscribeChannelListRef, socketRef]
  );

  const sendChangeData = useCallback(
    (nowQuestionIndex: number, updateExamQuestionData: ExamQuestion) => {
      socket.emit("examReviewRoom_question_live", {
        userId: id,
        examScheduleId,
        examType,
        nowQuestionIndex,
        updateExamQuestionData,
      });
    },
    [id, examScheduleId, examType, socket]
  );

  const sendChangeQuestionCount = useCallback(
    (currentCount: number, newCount: number) => {
      socket.emit("examReviewRoom_question_option", {
        userId: id,
        examScheduleId,
        examType,
        setQuestionCount: {
          currentCount,
          newCount,
        },
      });
    },
    [id, examScheduleId, examType, socket]
  );

  const sendDeleteQuestion = useCallback(
    (examQuestionId: number) => {
      socket.emit("examReviewRoom_question_option", {
        userId: id,
        examScheduleId,
        examType,
        deleteExamQuestionId: examQuestionId,
      });
    },
    [id, examScheduleId, examType, socket]
  );

  const getPreviousQuestion = useCallback(
    (timer: number) => {
      emitPreviousQuestionRequest(
        {
          userId: id,
          examScheduleId,
          examType,
          timer,
        },
        socket
      );
    },
    [id, examScheduleId, examType, socket]
  );

  return {
    getPreviousQuestion,
    sendChangeData,
    sendChangeQuestionCount,
    sendDeleteQuestion,
  };
};

export const useLiveQuestionQuery = (
  examScheduleId?: string,
  examType?: string
) =>
  useQuery<{
    examQuestionList: ExamQuestion[];
    liveWrittingUser: number[];
  }>(["examReviewRoom", examScheduleId, examType, "question"]);
