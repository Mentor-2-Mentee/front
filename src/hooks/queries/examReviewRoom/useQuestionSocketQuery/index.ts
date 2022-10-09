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
  examField?: string;
}

export const useQuestionSocketQuery = ({
  id,
  examScheduleId,
  examField,
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
      examField,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [
      id,
      examScheduleId,
      examField,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    ]
  );

  useEffect(
    subscribeLiveQuestionSocket({
      examScheduleId,
      examField,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examScheduleId, examField, queryClient, subscribeChannelListRef, socketRef]
  );

  useEffect(
    subscriveQuestionOptionSocket({
      examScheduleId,
      examField,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [examScheduleId, examField, queryClient, subscribeChannelListRef, socketRef]
  );

  const sendChangeData = useCallback(
    (nowQuestionIndex: number, updateExamQuestionData: ExamQuestion) => {
      socket.emit("examReviewRoom_question_live", {
        id,
        examScheduleId,
        examField,
        nowQuestionIndex,
        updateExamQuestionData,
      });
    },
    [id, examScheduleId, examField, socket]
  );

  const sendChangeQuestionCount = useCallback(
    (currentCount: number, newCount: number) => {
      socket.emit("examReviewRoom_question_option", {
        id,
        examScheduleId,
        examField,
        setQuestionCount: {
          currentCount,
          newCount,
        },
      });
    },
    [id, examScheduleId, examField, socket]
  );

  const sendDeleteQuestion = useCallback(
    (examQuestionId: number) => {
      socket.emit("examReviewRoom_question_option", {
        id,
        examScheduleId,
        examField,
        deleteExamQuestionId: examQuestionId,
      });
    },
    [id, examScheduleId, examField, socket]
  );

  const getPreviousQuestion = useCallback(
    (timer: number) => {
      emitPreviousQuestionRequest(
        {
          id,
          examScheduleId,
          examField,
          timer,
        },
        socket
      );
    },
    [id, examScheduleId, examField, socket]
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
  examField?: string
) =>
  useQuery<{
    examQuestionList: ExamQuestion[];
    liveWrittingUser: number[];
  }>(["examReviewRoom", examScheduleId, examField, "question"]);
