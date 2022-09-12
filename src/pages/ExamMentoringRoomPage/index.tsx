import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { useParams } from "react-router";
import { getCookieValue } from "../../utils/handleCookieValue";
import {
  useGetExamMentoringRoomQuery,
  useQuestionSocketQuery,
  useLiveQuestionQuery,
} from "../../hooks/queries/examMentoringRoom";
import {
  BottomBar,
  PdfDownload,
  Question,
  SetQuestionOption,
  TopBar,
} from "./Components";
import LiveChat from "../RoomPage/LiveChat";

export type RoomMode =
  | "chat"
  | "question"
  | "setQuestionOption"
  | "pdfDownload"
  | "userList";

export const ExamMentoringRoomPage = (): JSX.Element => {
  const { userId } = useContext(RootContext);
  const [roomMode, setRoomMode] = useState<RoomMode>("question");
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);
  const { examScheduleId, examField } = useParams();

  const examMentoringRoomQuery = useGetExamMentoringRoomQuery({
    token: getCookieValue("accessToken"),
    examScheduleId,
    examField,
  });

  const { getPreviousQuestion, sendChangeData } = useQuestionSocketQuery({
    userId,
    examScheduleId,
    examField,
  });

  const liveQuestionQuery = useLiveQuestionQuery(examScheduleId, examField);

  useEffect(() => {
    if (liveQuestionQuery.status !== "success") return;
    setQuestionCount(liveQuestionQuery.data.examQuestionList.length);
  }, [liveQuestionQuery.status, liveQuestionQuery.data]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setInterval(() => {
      getPreviousQuestion(timer);
    }, 500);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (
    examMentoringRoomQuery.status !== "success" ||
    liveQuestionQuery.data === undefined
  ) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: SignatureColor.WHITE,
      }}
    >
      <TopBar
        useRoomModeState={[roomMode, setRoomMode]}
        roomData={examMentoringRoomQuery.data.examMentoringRoom}
      />
      <>
        {roomMode === "question" ? (
          <>
            <Question
              nowQuestionIndex={nowQuestionIndex}
              nowQuestion={
                liveQuestionQuery.data?.examQuestionList[nowQuestionIndex]
              }
              sendChangeData={sendChangeData}
            />
            <BottomBar
              questionCount={questionCount}
              useNowQuestionIndexState={[nowQuestionIndex, setNowQuestionIndex]}
            />
          </>
        ) : null}
      </>
      <>{roomMode === "chat" ? <LiveChat /> : null}</>
      <>{roomMode === "setQuestionOption" ? <SetQuestionOption /> : null}</>
      <>{roomMode === "pdfDownload" ? <PdfDownload /> : null}</>
    </Box>
  );
};

export default ExamMentoringRoomPage;
