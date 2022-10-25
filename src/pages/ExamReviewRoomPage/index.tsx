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
  RoomMode,
  Option,
} from "./Components";
import QuestionGrid from "./Components/QuestionGrid";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examReviewRoom/useGetExamQuestionListQuery";
import { useQuery } from "@tanstack/react-query";

interface RoomContent {
  roomMode: RoomMode;
}

const RoomContent = ({ roomMode }: RoomContent) => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);

  const examQuestionQuery = useGetExamQuestionListQuery({
    token: getCookieValue("accessToken"),
    examReviewRoomId,
  });

  const {
    getPreviousQuestion,
    sendChangeData,
    sendChangeQuestionCount,
    sendDeleteQuestion,
  } = useQuestionSocketQuery({
    id,
    examReviewRoomId,
  });

  switch (roomMode) {
    case "submit":
      if (examQuestionQuery.status === "loading") return <CircularProgress />;
      if (examQuestionQuery.status === "error") return <div>Error</div>;
      return (
        <SubmitQuestion
          questionCount={examQuestionQuery.data.examQuestionList.length}
        />
      );

    case "questions":
      if (examQuestionQuery.status === "loading") return <CircularProgress />;
      if (examQuestionQuery.status === "error") return <div>Error</div>;
      return (
        <QuestionGrid
          examQuestionList={examQuestionQuery.data.examQuestionList}
        />
      );

    case "chat":
      return <LiveChat />;

    case "option":
      return <Option />;

    case "download":
      return <PdfDownload />;

    case "users":
      return <UserList />;

    default:
      return <div>{null}</div>;
  }
};

export const ExamReviewRoomPage = (): JSX.Element => {
  // const { id } = useContext(RootContext);
  const [roomMode, setRoomMode] = useState<RoomMode>("submit");
  // const [questionCount, setQuestionCount] = useState<number>(20);
  // const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);
  // const params = useParams();
  // const examReviewRoomId = Number(params.examReviewRoomId);
  // const [tryCount, setTryCount] = useState<number>(3);
  // const [intervalTimer, setIntervalTimer] = useState<number>();

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: SignatureColor.WHITE,
      }}
    >
      <TopBar useRoomModeState={[roomMode, setRoomMode]} />
      <RoomContent roomMode={roomMode} />
    </Box>
  );

  // const {
  //   getPreviousQuestion,
  //   sendChangeData,
  //   sendChangeQuestionCount,
  //   sendDeleteQuestion,
  // } = useQuestionSocketQuery({
  //   id,
  //   examReviewRoomId,
  // });

  // const liveQuestionQuery = useLiveQuestionQuery(examReviewRoomId);

  // useEffect(() => {
  //   if (liveQuestionQuery.status !== "success") return;
  //   setQuestionCount(liveQuestionQuery.data.examQuestionList.length);
  // }, [liveQuestionQuery.status, liveQuestionQuery.data]);

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   const timer = window.setInterval(() => {
  //     getPreviousQuestion(timer);
  //     setIntervalTimer(timer);
  //     setTryCount((currentCount) => currentCount - 1);
  //   }, 1000);
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, []);

  // useEffect(() => {
  //   if (intervalTimer && tryCount <= 0) {
  //     window.clearInterval(intervalTimer);
  //   }
  // }, [intervalTimer, tryCount]);

  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexFlow: "column",
  //       backgroundColor: SignatureColor.WHITE,
  //     }}
  //   >
  //     <TopBar useRoomModeState={[roomMode, setRoomMode]} />
  //     <>
  //       {roomMode === "submit" ? (
  //         <SubmitQuestion questionCount={questionCount} />
  //       ) : null}
  //     </>
  //     <>
  //       {roomMode === "question" ? (
  //         <>
  //           <Question
  //             useNowQuestionIndexState={[nowQuestionIndex, setNowQuestionIndex]}
  //             nowQuestion={
  //               liveQuestionQuery.data?.examQuestionList[nowQuestionIndex]
  //             }
  //             sendChangeData={sendChangeData}
  //           />
  //           <BottomBar
  //             questionCount={questionCount}
  //             useNowQuestionIndexState={[nowQuestionIndex, setNowQuestionIndex]}
  //           />
  //         </>
  //       ) : null}
  //     </>
  //     <>{roomMode === "chat" ? <LiveChat /> : null}</>
  //     <>
  //       {roomMode === "setQuestionOption" ? (
  //         <SetQuestionOption
  //           examQuestionList={liveQuestionQuery.data?.examQuestionList}
  //           sendChangeQuestionCount={sendChangeQuestionCount}
  //           sendDeleteQuestion={sendDeleteQuestion}
  //         />
  //       ) : null}
  //     </>
  //     <>{roomMode === "pdfDownload" ? <PdfDownload /> : null}</>
  //     <>{roomMode === "userList" ? <UserList /> : null}</>
  //   </Box>
  // );
};

export default ExamReviewRoomPage;
