import { Box } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router";
import { RootContext } from "../../../hooks/context/RootContext";
import { useExamReviewRoomChatSocketQuery } from "../../../hooks/queries/examReviewRoomChat";
import { LiveChat as LiveChatBaseComponent } from "../../RoomPage/LiveChat";

export const LiveChat = () => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);
  const { sendChat } = useExamReviewRoomChatSocketQuery({
    examReviewRoomId,
  });

  return (
    <Box
      sx={(theme) => ({
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(17)} )`,
      })}
    >
      <LiveChatBaseComponent fullWidth fullHeight nonHeader />
    </Box>
  );
};

export default LiveChat;
