import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";
import { useChatSocketQuery } from "../../../hooks/queries/liveChat";
import { socketInstance } from "../../../api/socketInstance";
import LiveChatInput from "./LiveChatInput";
import { ChatElement } from "./LiveChatElement";

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const socketRef = useRef<Socket>();
  const { userId } = useContext(RootContext);

  const socketInit = () => {
    socketRef.current = socketInstance();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      console.log(`webSocket disconnected`);
    };
  };

  useEffect(socketInit, []);

  const { sendChat, getPreviousChatList } = useChatSocketQuery({
    roomId,
    userId,
    socketRef: socketRef,
  });

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList />
      <LiveChatInput sendChat={sendChat} />
      <button
        onClick={() => {
          if (!roomId || !userId) return;
          getPreviousChatList({
            roomId,
            userId,
            limit: 20,
            // targetTimeStamp: "2022-07-30T14:13:26.097Z", //5 타임스템프(현재보유중인 가장 오래된 챗). 1,2,3,4까지를 원하는것
            targetTimeStamp: "latest",
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
