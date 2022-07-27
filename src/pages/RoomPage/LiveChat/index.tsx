import { styled } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { socketInstance } from "../../../api/socketInstance";
import InfinityScroll from "../../../commonElements/InfinityScroll";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatList, { LiveChatElement } from "./LiveChatList";

export interface ChatElement {
  uid: string;
  nickName: string;
  text: string;
  createAt: Date;
  roomId: string;
  imageURL?: string;
}

export const LiveChat = (): JSX.Element => {
  const { roomId } = useParams();
  const [chatList, setChatList] = useState<ChatElement[]>([]);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const socketRef = useRef<Socket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [nowPage, setNowPage] = useState<number>(0);
  const { userId, username } = useContext(RootContext);

  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(event.target.value);
  };

  const socketInit = () => {
    socketRef.current = socketInstance({ setIsConnected });
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
      setIsConnected(true);
    });

    return () => {
      socketRef.current!.off(`chatToClient_${roomId}`);
    };
  };

  useEffect(subscribeLiveChat, [chatList, socketRef.current]);
  useEffect(socketInit, []);

  //이전 채팅 가져오기
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on(
      `previousChatList_${roomId}_${userId}`,
      (res: { data: ChatElement[]; nextPreviousPage: number }) => {
        console.log("res", res, isLoading);
        try {
          if (!res.data) throw "get Null";

          setChatList((cur) => {
            return [...res.data, ...cur];
          });
          setNowPage(res.nextPreviousPage);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
    return () => {
      socketRef.current!.off(`previousChatList_${roomId}_${userId}`);
    };
  }, [socketRef.current]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LiveChatContainer>
      <LiveChatHeader />
      <LiveChatList
        useChatListState={[chatList, setChatList]}
        userId={userId}
        socketRef={socketRef}
        isConnected={isConnected}
        useNowPageState={[nowPage, setNowPage]}
        useIsLoadingState={[isLoading, setIsLoading]}
      />
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
      <button
        onClick={() => {
          console.log(chatList);
        }}
      >
        로그확인
      </button>
      <button
        onClick={() => {
          if (!socketRef.current) return;
          socketRef.current.emit(`getPreviousChatList`, {
            roomId: roomId,
            userId: userId,
            previousChatBundleIndex: 0,
          });
        }}
      >
        이전로그 가져오기 0
      </button>
      <button
        onClick={() => {
          if (!socketRef.current) return;
          socketRef.current.emit(`getPreviousChatList`, {
            roomId: roomId,
            userId: userId,
            previousChatBundleIndex: 1,
          });
        }}
      >
        이전로그 가져오기 1
      </button>
      <button
        onClick={() => {
          if (!socketRef.current) return;
          socketRef.current.emit(`getPreviousChatList`, {
            roomId: roomId,
            userId: userId,
            previousChatBundleIndex: 2,
          });
        }}
      >
        이전로그 가져오기 2
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
