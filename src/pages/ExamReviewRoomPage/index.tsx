import { Box, CircularProgress } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useQuestionSocketQuery } from "../../hooks/queries/examReviewRoom";
import {
  PdfDownload,
  TopBar,
  RoomChat,
  UserList,
  SubmitQuestion,
  RoomMode,
  RoomOptions,
} from "./Components";
import { useGetExamQuestionListQuery } from "../../hooks/queries/examQuestion/useGetExamQuestionListQuery";
import MergeQuestion from "./Components/MergeQuestion";
import { useGetAuthorizedCheckQuery } from "../../hooks/queries/examReviewRoomUser/usePostAuthorizedCheckMutation";
import { useExamReviewRoomChatSocketQuery } from "../../hooks/queries/examReviewRoomChat";
import { socketInstance } from "../../api/socketInstance";

interface RoomContent {
  roomMode: RoomMode;
  userPosition: string;
}

const RoomContent = ({ roomMode, userPosition }: RoomContent) => {
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);
  const examReviewRoomSocket = socketInstance({});

  const { data: examQuestionListData, status: examQuestionQueryStatus } =
    useGetExamQuestionListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  const { sendChat } = useExamReviewRoomChatSocketQuery({
    examReviewRoomId,
    socket: examReviewRoomSocket,
  });

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
          userPosition={userPosition}
        />
      );

    case "chat":
      return <RoomChat sendChat={sendChat} />;

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
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);
  const { hash } = useLocation();
  const hashedMode = hash.substring(1);
  const navigation = useNavigate();
  const initialMode = useCallback((hashedMode: string) => {
    switch (hashedMode) {
      case "submit":
      case "questions":
      case "chat":
      case "download":
      case "users":
      case "option":
        return hashedMode;

      default:
        return "questions";
    }
  }, []);

  const [roomMode, setRoomMode] = useState<RoomMode>(initialMode(hashedMode));

  const { data: authorizedCheckData, status: authorizedCheckQueryStatus } =
    useGetAuthorizedCheckQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  if (authorizedCheckQueryStatus === "loading") return <CircularProgress />;
  if (authorizedCheckQueryStatus === "error") return <div>Error</div>;
  if (!authorizedCheckData.userPosition)
    return <Navigate to="/error" state={{ from: location }} />;

  return (
    <Box>
      <TopBar useRoomModeState={[roomMode, setRoomMode]} />
      <RoomContent
        roomMode={roomMode}
        userPosition={authorizedCheckData.userPosition}
      />
    </Box>
  );
};

export default ExamReviewRoomPage;
