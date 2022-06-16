import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";

export interface ChatElement {
  uid: string;
  nickName: string;
  text: string;
  createAt: Date;
}

const id = Date.now();

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const [chatList, setChatList] = useState<ChatElement[]>([]);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const socketRef = useRef<Socket>();

  const handleMessageInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(evt.target.value);
  };

  const sendMessageByEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (evt.key === "Enter") {
      const time = new Date();
      const chat: ChatElement = {
        uid: id.toString(),
        createAt: time,
        text: nowMessage,
        nickName: "나",
      };

      socketRef.current?.emit("chatToServer", chat);
      setNowMessage("");
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      //create webSocket
      socketRef.current = socketInstance();
    }
    if (socketRef.current) {
      //connect receive chat point
      socketRef.current.on("chatToClient", (res: ChatElement) => {
        setChatList([...chatList, res]);
      });
    }
    return () => {
      //after receive chat, off chat point
      socketRef.current!.off("chatToClient");
    };
  }, [chatList]);

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList chatList={chatList} />
      <LiveChatInput
        type="text"
        value={nowMessage}
        onChange={handleMessageInput}
        onKeyDownCapture={sendMessageByEnter}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
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
