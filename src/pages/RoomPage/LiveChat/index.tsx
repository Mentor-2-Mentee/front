import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";
import {
  ChatSocketQueryType,
  useChatSocketQuery,
} from "../../../hooks/queries/liveChat";
import { socketInstance } from "../../../api/socketInstance";
import LiveChatInput from "./LiveChatInput";

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

  const { roomId } = useParams();
  const socketRef = useRef<Socket>();
  const { userId, username } = useContext(RootContext);

  const socketInit = () => {
    socketRef.current = socketInstance();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      console.log(`webSocket disconnected`);
    };
  };

  useEffect(socketInit, []);

  const socketEmitter = useChatSocketQuery({
    roomId,
    userId,
    socketRef: socketRef,
  });

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList
        useChatListState={[chatList, setChatList]}
        userId={userId}
      />
      <LiveChatInput socketEmitter={socketEmitter} />
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

export default LiveChat;
