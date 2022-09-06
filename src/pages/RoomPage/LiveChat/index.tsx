import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import AreaHeader from "../AreaHeader";
import LiveChatList from "./LiveChatList";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import LiveChatInput from "./LiveChatInput";

interface LiveChatProps {
  nonHeader?: boolean;
  fullWidth?: boolean;
}

export const LiveChat = ({
  nonHeader,
  fullWidth,
}: LiveChatProps): JSX.Element => {
  const { roomId } = useParams();
  const { userId } = useContext(RootContext);
  const [isSendChat, setIsSendChat] = useState<boolean>(false);

  const { sendChat, getPreviousChatList } = useChatSocketQuery({
    roomId,
    userId,
  });

  return (
    <LiveChatContainer
      sx={(theme) => ({
        maxWidth: fullWidth ? "none" : theme.spacing(40),
        width: "100%",
        margin: fullWidth ? "none" : theme.spacing(1),
      })}
    >
      {nonHeader ? null : <AreaHeader />}

      <LiveChatList
        getPreviousChatList={getPreviousChatList}
        useIsSendChatState={[isSendChat, setIsSendChat]}
      />
      <LiveChatInput sendChat={sendChat} setIsSendChat={setIsSendChat} />
    </LiveChatContainer>
  );
};

const LiveChatContainer = styled("div")(({ theme }) => ({
  // minHeight: "100%",
  // maxWidth: theme.spacing(40),
  // width: "100%",
  display: "flex",
  flexFlow: "column",
  borderRadius: theme.spacing(1),

  backgroundColor: SignatureColor.GRAY_BORDER,
}));

export default LiveChat;
