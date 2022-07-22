import { styled } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";

export interface ChatElement {
  uid: string;
  nickName: string;
  text: string;
  createAt: Date;
  roomId: string;
}

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const [chatList, setChatList] = useState<ChatElement[]>([]);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const socketRef = useRef<Socket>();
  const { userId, username } = useContext(RootContext);

  const handleMessageInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(evt.target.value);
  };

  const socketInit = () => {
    socketRef.current = socketInstance();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      console.log(`webSocket disconnected`);
    };
  };

  const sendMessageByEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!roomId) return;
    if (userId === undefined || username === undefined) return;
    if (evt.key === "Enter") {
      const time = new Date();
      const chat: ChatElement = {
        uid: userId,
        createAt: time,
        text: nowMessage,
        nickName: username,
        roomId: roomId,
      };

      socketRef.current?.emit(`chatToServer`, chat);
      setNowMessage("");
    }
  };

  const subscribeLiveChat = () => {
    if (!socketRef.current) return;
    socketRef.current.on(`chatToClient_${roomId}`, (res: ChatElement) => {
      setChatList([...chatList, res]);
    });
    return () => {
      socketRef.current!.off(`chatToClient_${roomId}`);
    };
  };

  useEffect(subscribeLiveChat, [chatList, socketRef.current]);
  useEffect(socketInit, []);

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <RootContext.Consumer>
        {({ userId }) => (
          <>
            <LiveChatList chatList={chatList} userId={userId} />
            <LiveChatInput
              disabled={userId === undefined}
              placeholder={userId === undefined ? "로그인 후 사용해주세요" : ""}
              type="text"
              value={nowMessage}
              onChange={handleMessageInput}
              onKeyDownCapture={sendMessageByEnter}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </>
        )}
      </RootContext.Consumer>
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

const LiveChatInput = styled("input")(({ theme }) => ({
  margin: theme.spacing(1),
  border: "none",
}));

export default LiveChat;
