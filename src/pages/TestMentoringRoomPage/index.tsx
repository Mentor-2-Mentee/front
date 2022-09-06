import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import Question from "./Question";
import LiveChat from "./LiveChat";

export type RoomMode = "chat" | "question";

export const TestMentoringRoomPage = (): JSX.Element => {
  const { userGrade } = useContext(RootContext);

  const [roomMode, setRoomMode] = useState<RoomMode>("question");
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [nowQuestionIndex, setNowQuestionIndex] = useState<number>(0);

  // const

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: SignatureColor.GRAY,
      }}
    >
      <TopBar useRoomModeState={[roomMode, setRoomMode]} />
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

export default TestMentoringRoomPage;
