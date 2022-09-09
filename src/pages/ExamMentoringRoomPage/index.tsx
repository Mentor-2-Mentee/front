import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import Question from "./Question";
import LiveChat from "./LiveChat";
import { useParams } from "react-router";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useGetExamMentoringRoomQuery } from "../../hooks/queries/examMentoringRoom";

export type RoomMode = "chat" | "question";

export const ExamMentoringRoomPage = (): JSX.Element => {
  const [roomMode, setRoomMode] = useState<RoomMode>("question");
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);
  const { examScheduleId, examField } = useParams();

  const examMentoringRoomQuery = useGetExamMentoringRoomQuery({
    token: getCookieValue("accessToken"),
    examScheduleId,
    examField,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (examMentoringRoomQuery.status !== "success") {
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
      {roomMode === "question" ? (
        <>
          <Question nowQuestionIndex={nowQuestionIndex} />
          <BottomBar
            questionCount={questionCount}
            useNowQuestionIndexState={[nowQuestionIndex, setNowQuestionIndex]}
          />
        </>
      ) : (
        <LiveChat />
      )}
    </Box>
  );
};

export default ExamMentoringRoomPage;
