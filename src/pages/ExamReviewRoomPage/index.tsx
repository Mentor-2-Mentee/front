import { Box, CircularProgress } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { useParams } from "react-router";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useQuestionSocketQuery } from "../../hooks/queries/examReviewRoom";
import {
  PdfDownload,
  TopBar,
  LiveChat,
  UserList,
  SubmitQuestion,
  RoomMode,
  Option,
} from "./Components";
import QuestionGrid from "./Components/QuestionGrid";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examReviewRoom/useGetExamQuestionListQuery";
import MergeQuestion from "./Components/MergeQuestion";

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
        <MergeQuestion
          examQuestionList={examQuestionQuery.data.examQuestionList}
        />
      );
    // return (
    //   <QuestionGrid
    //     examQuestionList={examQuestionQuery.data.examQuestionList}
    //   />
    // );

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
  const roomContentRef = useRef<HTMLDivElement>(null);

  const resizeContentBox = useCallback(() => {
    if (!roomContentRef.current) return;
    roomContentRef.current.style.height = `calc((var(--vh, 1vh) * 100) - 152px)`;
  }, [roomContentRef.current]);

  useEffect(() => {
    if (!roomContentRef.current) return;
    window.addEventListener("resize", () => {
      if (!roomContentRef.current) return;
      console.log("resize");
      roomContentRef.current.style.height = `calc((var(--vh, 1vh) * 100) - 152px)`;
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: SignatureColor.WHITE,
      }}
    >
      <TopBar useRoomModeState={[roomMode, setRoomMode]} />
      <Box
        ref={roomContentRef}
        sx={(theme) => ({
          height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(18)})`,
        })}
      >
        <RoomContent roomMode={roomMode} />
      </Box>
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
