import { styled } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import { socketInstance } from "../../../api/socketInstance";

export interface ChatElement {
  uid: string;
  nickName: string;
  text: string;
  createAt: Date;
  roomId: string;
  imageURL?: string;
}

export const LiveChat = (): JSX.Element => {
  const [chatList, setChatList] = useState<ChatElement[]>([]);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const { roomId } = useParams();
  const socketRef = useRef<Socket>();
  const { userId, username } = useContext(RootContext);

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(event.target.value);
  };

  const sendChatByEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
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

      socketEmitter("SEND_CHAT", chat);
      setNowMessage("");
    }
  };

  const socketInit = () => {
    socketRef.current = socketInstance();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      console.log(`webSocket disconnected`);
    };
  };

  useEffect(socketInit, []);

  const socketEmitter = useChatSocketQuery(
    {
      roomId,
      userId,
      socket: socketRef.current,
    },
    setChatList
  );

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList
        useChatListState={[chatList, setChatList]}
        userId={userId}
      />
      <LiveChatInput
        disabled={userId === undefined}
        placeholder={userId === undefined ? "로그인 후 사용해주세요" : ""}
        type="text"
        value={nowMessage}
        onChange={handleChatInput}
        onKeyDownCapture={sendChatByEnter}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      <button
        onClick={() => {
          socketEmitter("GET_PREVIOUS_MESSAGE", {
            roomId,
            userId,
            previousChatBundleIndex: 0,
          });
        }}
      >
        {"react query & websocket"}
      </button>
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
