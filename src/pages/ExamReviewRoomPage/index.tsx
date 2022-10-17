import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { useParams } from "react-router";
import { getCookieValue } from "../../utils/handleCookieValue";
import {
  useGetExamReviewRoomQuery,
  useQuestionSocketQuery,
  useLiveQuestionQuery,
  ExamQuestion,
} from "../../hooks/queries/examReviewRoom";
import {
  BottomBar,
  PdfDownload,
  Question,
  SetQuestionOption,
  TopBar,
  LiveChat,
  UserList,
  SubmitQuestion,
} from "./Components";

export type RoomMode =
  | "chat"
  | "question"
  | "setQuestionOption"
  | "pdfDownload"
  | "userList"
  | "submit";

export const ExamReviewRoomPage = (): JSX.Element => {
  const { id } = useContext(RootContext);
  const [roomMode, setRoomMode] = useState<RoomMode>("question");
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);
  const { examScheduleId, examType } = useParams();

  const examReviewRoomQuery = useGetExamReviewRoomQuery({
    token: getCookieValue("accessToken"),
    examScheduleId,
    examType,
  });

  const {
    getPreviousQuestion,
    sendChangeData,
    sendChangeQuestionCount,
    sendDeleteQuestion,
  } = useQuestionSocketQuery({
    id,
    examScheduleId,
    examType,
  });

  const liveQuestionQuery = useLiveQuestionQuery(examScheduleId, examType);

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
    examReviewRoomQuery.status !== "success" ||
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
        roomData={examReviewRoomQuery.data.examReviewRoom}
      />
      <>
        {roomMode === "submit" ? (
          <SubmitQuestion questionCount={questionCount} />
        ) : null}
      </>
      <>
        {roomMode === "question" ? (
          <>
            <Question
              useNowQuestionIndexState={[nowQuestionIndex, setNowQuestionIndex]}
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
      <>
        {roomMode === "setQuestionOption" ? (
          <SetQuestionOption
            examQuestionList={liveQuestionQuery.data?.examQuestionList}
            sendChangeQuestionCount={sendChangeQuestionCount}
            sendDeleteQuestion={sendDeleteQuestion}
          />
        ) : null}
      </>
      <>{roomMode === "pdfDownload" ? <PdfDownload /> : null}</>
      <>{roomMode === "userList" ? <UserList /> : null}</>
    </Box>
  );
};

export default ExamReviewRoomPage;
