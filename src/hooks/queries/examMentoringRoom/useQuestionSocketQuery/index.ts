import { QueryClient } from "@tanstack/query-core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ExamQuestion } from "..";
import { emitPreviousQuestionRequest } from "./emitPreviousQuestionRequest";
import { subscribePreviousQuestionSocket } from "./subscribePreviousQuestionSocket";
import { subscribeLiveQuestionSocket } from "./subscriveLiveQuestionSocket";

interface UseQuestionSocketQueryParams {
  userId?: string;
  examScheduleId?: string;
  examField?: string;
}

export const useQuestionSocketQuery = ({
  userId,
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
      userId,
      examScheduleId,
      examField,
      queryClient,
      subscribeChannelListRef,
      socketRef,
    }),
    [
      userId,
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

  const sendChangeData = useCallback(
    (nowQuestionIndex: number, updateExamQuestionData: ExamQuestion) => {
      console.log("updateExamQuestionData", updateExamQuestionData);
      socket.emit("examMentoringRoom_question_live", {
        userId,
        examScheduleId,
        examField,
        nowQuestionIndex,
        updateExamQuestionData,
      });
    },
    [userId, examScheduleId, examField, socket]
  );

  const getPreviousQuestion = useCallback(
    (timer: number) => {
      emitPreviousQuestionRequest(
        {
          userId,
          examScheduleId,
          examField,
          timer,
        },
        socket
      );
    },
    [userId, examScheduleId, examField, socket]
  );

  return {
    getPreviousQuestion,
    sendChangeData,
  };
};

export const useLiveQuestionQuery = (
  examScheduleId?: string,
  examField?: string
) =>
  useQuery<any>(["examMentoringRoom", examScheduleId, examField, "question"]);
