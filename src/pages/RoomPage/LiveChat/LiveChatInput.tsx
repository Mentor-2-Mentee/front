import { styled } from "@mui/system";
import { useCallback, useContext, useState } from "react";
import { RootContext } from "../../../hooks/context/RootContext";
import { useParams } from "react-router-dom";
import { ChatElement } from ".";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import { Socket } from "socket.io-client";

interface LiveChatInputProps {
  socketRef: React.MutableRefObject<Socket | undefined>;
}

export const LiveChatInput = ({
  socketRef,
}: LiveChatInputProps): JSX.Element => {
  const { roomId } = useParams();
  const { userId, username } = useContext(RootContext);

  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(event.target.value);
  };

  const sendChatByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!roomId) return;
    if (userId === undefined || username === undefined) return;
    if (event.key === "Enter") {
      const time = new Date();
      const chat: ChatElement = {
        uid: userId,
        createAt: time,
        text: nowMessage,
        nickName: username,
        roomId: roomId,
      };

      socketEmitter("SEND_CHAT", chat);
      setNowMessage("");
    }
  };

  const socketEmitter = useChatSocketQuery({
    roomId,
    userId,
    socket: socketRef.current,
  });

  return (
    <LiveChatInputTag
      disabled={userId === undefined}
      placeholder={userId === undefined ? "로그인 후 사용해주세요" : ""}
      type="text"
      value={nowMessage}
      onChange={handleChatInput}
      onKeyDownCapture={sendChatByEnter}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    />
  );
};

export default LiveChatInput;

const LiveChatInputTag = styled("input")(({ theme }) => ({
  margin: theme.spacing(1),
  border: "none",
}));
