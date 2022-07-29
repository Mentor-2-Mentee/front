import { styled } from "@mui/system";
import { ChatColor, SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from ".";
import DateFormatting from "../../../utils/dateFormatting";
import { useParams } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import InfinityScroll from "../../../commonElements/InfinityScroll";
import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "react-query";
import { Socket } from "socket.io-client";
import { CircularProgress } from "@mui/material";
import { getPastChatList } from "../../../api/getPastChatList";
import {
  ChatSocketCacheData,
  useChatSocketQuery,
} from "../../../hooks/queries/liveChat";

interface LiveChatListProps {
  useChatListState: [
    ChatElement[],
    React.Dispatch<React.SetStateAction<ChatElement[]>>
  ];
  userId?: string;
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
}: // isConnected,
LiveChatListProps): JSX.Element => {
  const { roomId } = useParams();

  const [latestChat, setLatestChat] = useState<ChatElement>();
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // const queryClient = useQueryClient();

  // const queryClientData = queryClient.getQueryData<{
  //   id: string;
  //   name: string;
  //   text: string;
  // }>(["liveChat", roomId]);

  const { status, data } = useQuery<ChatSocketCacheData>(["liveChat", roomId]);

  useEffect(() => {
    if (!data) return;
    setLatestChat(data.chatList[data?.chatList.length - 1]);
  }, [data]);
  useEffect(scrollToBottom, [latestChat]);

  return (
    <LiveChatListContainer ref={liveChatContainerRef}>
      {status === "loading" || data === undefined ? (
        <CircularProgress />
      ) : (
        <InfinityScroll
          listElements={data.chatList}
          limit={20}
          nowPage={0}
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
      )}
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
