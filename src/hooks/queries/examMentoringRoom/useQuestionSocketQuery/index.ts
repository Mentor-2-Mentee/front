import { QueryClient } from "@tanstack/query-core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { emitCurrentQuestionRequest } from "./emitCurrentQuestionRequest";
import { subscribeCurrentQuestionSocket } from "./subscribeCurrentQuestionSocket";

// export const questionSocketQueryClient = new QueryClient();

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
    subscribeCurrentQuestionSocket({
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

  const sendWrittenData = useCallback(
    (nowQuestionIndex: number) => {
      socket.emit("examMentoringRoom_question_live", {
        userId,
        examScheduleId,
        examField,
      });
    },
    [userId, examScheduleId, examField, socket]
  );

  const getCurrentQuestion = useCallback(
    (timer: number) => {
      emitCurrentQuestionRequest(
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
    getCurrentQuestion,
    sendWrittenData,
  };
};

export const useLiveQuestionQuery = (
  examScheduleId?: string,
  examField?: string
) =>
  useQuery<any>(["examMentoringRoom", examScheduleId, examField, "question"]);
