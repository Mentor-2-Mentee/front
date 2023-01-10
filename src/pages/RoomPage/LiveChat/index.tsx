import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import AreaHeader from "../AreaHeader";
import LiveChatList from "./LiveChatList";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import LiveChatInput from "./LiveChatInput";
import { Box, useMediaQuery } from "@mui/material";

interface LiveChatProps {
  nonHeader?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const LiveChat = ({
  nonHeader,
  // fullWidth,
  fullHeight,
}: LiveChatProps): JSX.Element => {
  const { roomId, examReviewRoomId } = useParams();
  const { id } = useContext(RootContext);
  const [isSendChat, setIsSendChat] = useState<boolean>(false);

  const chatRoomId = roomId === undefined ? examReviewRoomId : roomId;

  const { sendChat, getPreviousChatList } = useChatSocketQuery({
    roomId: chatRoomId,
    id,
  });

  const isWidthShort = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexFlow: "column",
        borderRadius: theme.spacing(1),
        backgroundColor: SignatureColor.GRAY_BORDER,
        height: fullHeight
          ? "100%"
          : isWidthShort
          ? `calc((var(--vh, 1vh) * 40))`
          : "none",
      })}
    >
      {nonHeader ? null : <AreaHeader />}

      <LiveChatList
        chatRoomId={chatRoomId}
        getPreviousChatList={getPreviousChatList}
        useIsSendChatState={[isSendChat, setIsSendChat]}
      />
      <LiveChatInput
        chatRoomId={chatRoomId}
        sendChat={sendChat}
        setIsSendChat={setIsSendChat}
      />
    </Box>
  );
};

export default LiveChat;
