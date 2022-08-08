import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import AreaHeader from "../AreaHeader";
import LiveChatList from "./LiveChatList";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import LiveChatInput from "./LiveChatInput";

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const { userId } = useContext(RootContext);
  const [isSendChat, setIsSendChat] = useState<boolean>(false);

  const { sendChat, getPreviousChatList } = useChatSocketQuery({
    roomId,
    userId,
  });

  return (
    <LiveChatContainer>
      <AreaHeader />
      <LiveChatList
        getPreviousChatList={getPreviousChatList}
        useIsSendChatState={[isSendChat, setIsSendChat]}
      />
      <LiveChatInput sendChat={sendChat} setIsSendChat={setIsSendChat} />
    </LiveChatContainer>
  );
};

const LiveChatContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: theme.spacing(40),
  maxHeight: `calc(100vh - ${theme.spacing(10.5)})`,
  display: "flex",
  flexFlow: "column",
  borderRadius: theme.spacing(1),

  backgroundColor: SignatureColor.GRAY_BORDER,
}));

export default LiveChat;
