import { styled } from "@mui/system";
import { ChatColor, SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from ".";
import DateFormatting from "../../../utils/dateFormatting";
import { useParams } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import InfinityScroll from "../../../commonElements/InfinityScroll";
import { useInfiniteQuery } from "react-query";
import { Socket } from "socket.io-client";
import { CircularProgress } from "@mui/material";
import { getPastChatList } from "../../../api/getPastChatList";

interface LiveChatListProps {
  // chatList: ChatElement[];
  useChatListState: [
    ChatElement[],
    React.Dispatch<React.SetStateAction<ChatElement[]>>
  ];
  userId?: string;
  socketRef: React.MutableRefObject<Socket | undefined>;
  isConnected: boolean;
  useNowPageState: [number, React.Dispatch<React.SetStateAction<number>>];
  useIsLoadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface GetBeforeChatParams {
  page: number;
  roomId: string;
  userId: string;
}

const CHAT_LOG_LIMIT = 20;

export const LiveChatList = ({
  useChatListState,
  userId,
  socketRef,
  isConnected,
  useNowPageState,
  useIsLoadingState,
}: LiveChatListProps): JSX.Element => {
  const { roomId } = useParams();
  const [chatList, setChatList] = useChatListState;
  const [latestChat, setLatestChat] = useState<ChatElement>();
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(scrollToBottom, [latestChat]);
  useEffect(() => {
    setLatestChat(chatList[chatList.length - 1]);
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatList]);

  const [nowPage, setNowPage] = useNowPageState;

  const fetchPreviousChatList = async () => {
    if (!socketRef.current || isLoading) return;
    console.log("fetchPreviousChatList page", nowPage);
    setIsLoading(true);
    socketRef.current.emit(`getPreviousChatList`, {
      roomId: roomId,
      userId: userId,
      previousChatBundleIndex: nowPage,
    });
  };

  const getInitialPreviousChatList = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(`getPreviousChatList`, {
      roomId: roomId,
      userId: userId,
      previousChatBundleIndex: "latest",
    });
  };

  const [isLoading, setIsLoading] = useIsLoadingState;

  useEffect(() => {
    console.log("isSocketConnected", isConnected);
    if (!isConnected) return;
    getInitialPreviousChatList();
  }, [isConnected]);

  return (
    <LiveChatListContainer ref={liveChatContainerRef}>
      <InfinityScroll
        listElements={chatList}
        fetchElementFunction={fetchPreviousChatList}
        limit={20}
        nowPage={nowPage}
        hasNextPage={true}
        targetContainer={liveChatContainerRef}
        reversed
        renderElement={(elementProps, index) => {
          return (
            <LiveChatElement
              key={`${elementProps.createAt}-${index}`}
              userId={userId}
              chatElement={elementProps}
              isContinuous={false}
            />
          );
        }}
      />
    </LiveChatListContainer>
  );
};

interface LiveChatElementProps {
  chatElement: ChatElement;
  isContinuous: boolean;
  userId?: string;
}

export const LiveChatElement = ({
  chatElement,
  isContinuous,
  userId,
}: LiveChatElementProps): JSX.Element => {
  const formattedDate = new DateFormatting(chatElement.createAt);

  if (userId === chatElement.uid) {
    return (
      <MyLiveChatElement>
        <MyLiveChatTimeStamp>{formattedDate.HH_MM}</MyLiveChatTimeStamp>
        <MyLiveChatText>{chatElement.text}</MyLiveChatText>
      </MyLiveChatElement>
    );
  }

  return (
    <OtherLiveChatElement>
      <div>{isContinuous ? null : chatElement.nickName}</div>
      <OtherLiveChatContentsContainer>
        <OtherLiveChatText>{chatElement.text}</OtherLiveChatText>
        <OtherLiveChatTimeStamp>{formattedDate.HH_MM}</OtherLiveChatTimeStamp>
      </OtherLiveChatContentsContainer>
    </OtherLiveChatElement>
  );
};

const LiveChatListContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 1),
  backgroundColor: SignatureColor.WHITE,
  height: `calc(100vh - ${theme.spacing(22)})`,
  maxHeight: `calc(100vh - ${theme.spacing(22)})`,
  overflow: "scroll",
}));

const MyLiveChatElement = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  margin: theme.spacing(1, 1.5, 1, 1),
  maxWidth: "100%",
}));

const MyLiveChatText = styled("div")(({ theme }) => ({
  backgroundColor: ChatColor.MY_CHAT,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
}));

const MyLiveChatTimeStamp = styled("div")(({ theme }) => ({
  margin: theme.spacing("auto", 0.5, 0, 0),
  fontSize: "12px",
}));

const OtherLiveChatElement = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  maxWidth: "100%",
}));

const OtherLiveChatContentsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginLeft: theme.spacing(1),
  maxWidth: "100%",
}));

const OtherLiveChatText = styled("div")(({ theme }) => ({
  backgroundColor: ChatColor.OTHER_CHAT,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
}));

const OtherLiveChatTimeStamp = styled("div")(({ theme }) => ({
  margin: theme.spacing("auto", 0, 0, 0.5),
  fontSize: "12px",
}));

export default memo(LiveChatList);
