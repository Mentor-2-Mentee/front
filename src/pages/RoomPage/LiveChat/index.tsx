import { styled } from "@mui/system";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
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
  const socketRef = useRef<Socket>();

  const initialPreviousChatListFetch = () => {
    getPreviousChatList({
      roomId,
      userId,
      limit: 10,
      targetTimeStamp: "latest",
    });
  };

  const socketInit = () => {
    socketRef.current = socketInstance({
      instantlyEmitAction: initialPreviousChatListFetch,
    });

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

  const { status, data } = useQuery<ChatSocketCacheEntity>(
    ["liveChat", roomId],
    {
      initialData: {
        chatList: [],
        latestChatIndex: -1,
      },
    }
  );

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList
        getPreviousChatList={getPreviousChatList}
        socketRef={socketRef}
      />
      <LiveChatInput sendChat={sendChat} />
      <button
        onClick={() => {
          if (!roomId || !userId || !data) return;
          getPreviousChatList({
            roomId,
            userId,
            limit: 20,
            targetTimeStamp:
              data.chatList.length === 0
                ? "latest"
                : data.chatList[0].createdAt.toString(),
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
