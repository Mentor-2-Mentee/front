import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
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
      <LiveChatHeader />
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
  display: "grid",
  gridTemplateRows: "40px auto 50px",
  borderRadius: theme.spacing(1),

  backgroundColor: SignatureColor.GRAY_BORDER,
}));

export default LiveChat;
