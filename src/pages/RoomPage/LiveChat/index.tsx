import { styled } from "@mui/system";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList from "./LiveChatList";
import {
  ChatSocketCacheEntity,
  useChatSocketQuery,
} from "../../../hooks/queries/liveChat";
import { socketInstance } from "../../../api/socketInstance";
import LiveChatInput from "./LiveChatInput";
import { useQuery } from "react-query";

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const { userId } = useContext(RootContext);

  const { sendChat, getPreviousChatList, socketRef } = useChatSocketQuery({
    roomId,
    userId,
  });

  const { status, data } = useQuery<ChatSocketCacheEntity>(
    ["liveChat", roomId],
    {
      initialData: {
        chatList: [],
        latestChatIndex: -1,
      },
    }
  );

  const timerRef = useRef<number>(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const timer = window.setInterval(() => {
  //       console.log("초기 반복요청");
  //       getPreviousChatList({
  //         roomId,
  //         userId,
  //         limit: 10,
  //         targetTimeStamp: "latest",
  //         sendTime: timer,
  //       });
  //     }, 500);
  //     timerRef.current = timer;
  //   }, 500);

  //   return () => {
  //     window.clearInterval(timerRef.current);
  //   };
  // }, []);

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList getPreviousChatList={getPreviousChatList} />
      <LiveChatInput sendChat={sendChat} />
      <button
        onClick={() => {
          console.log("타이머코드!", timerRef.current);
          console.log("소캣확인", socketRef);
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
