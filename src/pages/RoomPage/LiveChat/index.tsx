import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import { SignatureColor } from "../../../commonStyles/CommonColor";

interface ChatElement {
  uid: string;
  nickName: string;
  text: string;
  createAt: string;
}

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
      const time = Date.now();
      const chat: ChatElement = {
        uid: "나의uid",
        createAt: time.toString(),
        text: nowMessage,
        nickName: "나",
      };
      console.log(chat);
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
      console.log("소캣접속", socketRef.current);
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
      <LiveChatHeader>실시간 채팅 : {roomId}</LiveChatHeader>
      <LiveChatList>
        {chatList.map((chat, chatId) => {
          return (
            <div key={chatId} style={{ display: "flex" }}>
              <div>{chat.nickName}</div>
              <div>{chat.text}</div>
            </div>
          );
        })}
      </LiveChatList>
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

  backgroundColor: SignatureColor.GRAY_BORDER,
}));

const LiveChatHeader = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(1),
  backgroundColor: SignatureColor.BLACK_50,
  color: SignatureColor.WHITE,
  alignItems: "center",
}));

const LiveChatList = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 1),
  flex: 1,
  backgroundColor: SignatureColor.WHITE,
}));

const LiveChatInput = styled("input")(({ theme }) => ({
  margin: theme.spacing(1),
  border: "none",
}));

export default LiveChat;
