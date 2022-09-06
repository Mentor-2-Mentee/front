import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import Question from "./Question";

export const TestMentoringRoomPage = (): JSX.Element => {
  const { userGrade } = useContext(RootContext);

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
      <TopBar />

      <Question />

      <BottomBar />
    </Box>
  );
};

export default TestMentoringRoomPage;
