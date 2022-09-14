import { styled } from "@mui/system";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from "./LiveChatElement";
import { useParams } from "react-router-dom";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { LiveChatCacheDataEntitiy } from "../../../hooks/queries/liveChat";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatElement from "./LiveChatElement";
import { GetPreviousChatListQueryParams } from "../../../hooks/queries/liveChat/emitPreviousChatListRequest";

interface LiveChatListProps {
  getPreviousChatList: (
    socketQueryData: GetPreviousChatListQueryParams
  ) => void;
  useIsSendChatState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  chatRoomId?: string;
}

const PREV_CHAT_FETCH_LIMIT = 10;
const CHAT_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
};

export const LiveChatList = ({
  getPreviousChatList,
  useIsSendChatState,
  chatRoomId,
}: LiveChatListProps): JSX.Element => {
  const { userId } = useContext(RootContext);
  const [latestChat, setLaexamChat] = useState<ChatElement>();
  const [isSendChat, setIsSendChat] = useIsSendChatState;
  const [chatListHeight, setChatListHeight] = useState<number>(0);

  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  const { status, data } = useQuery<LiveChatCacheDataEntitiy>(
    ["liveChat", chatRoomId],
    {
      initialData: {
        chatList: [],
        latestChatIndex: -1,
      },
    }
  );

  const checkLaexamChat = () => {
    if (!data) return;
    setLaexamChat(data.chatList[data.chatList.length - 1]);
  };

  const scrollToBottom = () => {
    if (!isSendChat) return;
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
    });
    setIsSendChat(false);
  };

  const scrollToBeforePreviousChatSection = () => {
    if (!liveChatContainerRef.current) return;
    liveChatContainerRef.current.scrollTo({
      top: liveChatContainerRef.current.scrollHeight - chatListHeight,
    });
    setChatListHeight(liveChatContainerRef.current.scrollHeight);
  };

  const setIntervalPreviousChatListRequest = () => {
    if (!data) return;
    const timer = window.setInterval(() => {
      getPreviousChatList({
        roomId: chatRoomId,
        userId,
        limit: PREV_CHAT_FETCH_LIMIT,
        targetTimeStamp:
          data?.chatList.length === 0
            ? "latest"
            : data.chatList[0].createdAt.toString(),
        sendTime: timer,
      });
    }, 500);
  };

  const observer = useMemo(() => {
    return new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        setIntervalPreviousChatListRequest();
        observer.disconnect();
      }
    }, CHAT_OBSERVER_OPTION);
  }, [liveChatContainerRef, data]);

  const observingTarget = () => {
    if (!liveChatContainerRef.current) return;
    if (liveChatContainerRef.current.children.length === 0) return;
    if (!data) return;
    if (data.chatList.length === 0) return;

    observer.observe(liveChatContainerRef.current.children[0]);

    return cleanUpCurrentObserve;
  };

  const cleanUpCurrentObserve = () => {
    if (!observer) return;
    if (!liveChatContainerRef.current) return;
    observer.unobserve(liveChatContainerRef.current);
  };

  useEffect(observingTarget, [liveChatContainerRef, data, observer]);
  useEffect(checkLaexamChat, [data]);
  useEffect(scrollToBottom, [latestChat]);
  useEffect(scrollToBeforePreviousChatSection, [data, liveChatContainerRef]);

  return (
    <>
      <LiveChatListContainer ref={liveChatContainerRef}>
        {status === "error" || data === undefined ? (
          <CircularProgress />
        ) : (
          renderChatList(data.chatList, userId)
        )}
      </LiveChatListContainer>
    </>
  );
};

const renderChatList = (
  chatList: ChatElement[],
  userId?: string
): JSX.Element => {
  return (
    <>
      {chatList.map((chatElement, index) => {
        return (
          <LiveChatElement
            key={chatElement.createdAt.toString() + index}
            userId={userId}
            chatElement={chatElement}
            isContinuous={false}
          />
        );
      })}
    </>
  );
};

const LiveChatListContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 1),
  flex: 1,
  backgroundColor: SignatureColor.WHITE,
  overflow: "scroll",
}));

export default memo(LiveChatList);
