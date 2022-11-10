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
  RoomOptions,
} from "./Components";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import MergeQuestion from "./Components/MergeQuestion";

interface RoomContent {
  roomMode: RoomMode;
}

const RoomContent = ({ roomMode }: RoomContent) => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);

  const { data: examQuestionListData, status: examQuestionQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  // const {
  //   getPreviousQuestion,
  //   sendChangeData,
  //   sendChangeQuestionCount,
  //   sendDeleteQuestion,
  // } = useQuestionSocketQuery({
  //   id,
  //   examReviewRoomId,
  // });

  switch (roomMode) {
    case "submit":
      if (examQuestionQueryStatus === "loading") return <CircularProgress />;
      if (examQuestionQueryStatus === "error") return <div>Error</div>;
      return (
        <SubmitQuestion
          examReviewRoomId={examReviewRoomId}
          examQuestionList={examQuestionListData.examQuestionList}
        />
      );

    case "questions":
      if (examQuestionQueryStatus === "loading") return <CircularProgress />;
      if (examQuestionQueryStatus === "error") return <div>Error</div>;
      return (
        <MergeQuestion
          examQuestionList={examQuestionListData.examQuestionList}
        />
      );

    case "chat":
      return <LiveChat />;

    case "option":
      return <RoomOptions />;

    case "download":
      return <PdfDownload examReviewRoomId={examReviewRoomId} />;

    case "users":
      return <UserList />;

    default:
      return <div>{null}</div>;
  }
};

export const ExamReviewRoomPage = (): JSX.Element => {
  const [roomMode, setRoomMode] = useState<RoomMode>("questions");

  return (
    <Box>
      <TopBar useRoomModeState={[roomMode, setRoomMode]} />
      <RoomContent roomMode={roomMode} />
    </Box>
  );
};

export default ExamReviewRoomPage;
