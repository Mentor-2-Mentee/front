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
  }, [chatList]);

  //scroll

  // const [nowChatPage, setNowChatPage] = useState<number>(0);

  const getPastChatListForINF = async ({ pageParam = 0 }) => {
    console.log("getPastChatListForINF", pageParam);
    const response = await getPastChatList({
      page: pageParam,
      roomId,
      userId,
    });
    setChatList([...response.data, ...chatList]);
    return response;
  };

  const { data, error, fetchNextPage, hasNextPage, status, refetch } =
    useInfiniteQuery(["getPastChatList"], getPastChatListForINF, {
      getNextPageParam: (recentResponse, page) => {
        if (!recentResponse.nextPage) return false;
        return recentResponse.nextPage;
      },
    });

  return (
    <LiveChatListContainer ref={liveChatContainerRef}>
      {status === "loading" || data === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {data.pages.map((group, index) => {
            return (
              <InfinityScroll
                key={`chatList_${roomId}_${index}`}
                limit={CHAT_LOG_LIMIT}
                listElements={chatList}
                nowPage={group.nextPage === undefined ? 0 : group.nextPage - 1}
                targetContainer={liveChatContainerRef}
                fetchElementFunction={fetchNextPage}
                reversed
                hasNextPage={hasNextPage}
                renderElement={(elementProps, index) => {
                  return (
                    <LiveChatElement
                      key={index}
                      chatElement={elementProps}
                      isContinuous={false}
                      userId={userId}
                    />
                  );
                }}
              />
            );
          })}
        </>
      )}
      <button
        onClick={() => {
          console.log(liveChatContainerRef.current?.children[0]);
        }}
      >
        asdf
      </button>
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
        <MyLiveChatTimeStamp>{formattedDate.HH_MM_SS}</MyLiveChatTimeStamp>
        <MyLiveChatText>{chatElement.text}</MyLiveChatText>
      </MyLiveChatElement>
    );
  }

  return (
    <OtherLiveChatElement>
      <div>{isContinuous ? null : chatElement.nickName}</div>
      <OtherLiveChatContentsContainer>
        <OtherLiveChatText>{chatElement.text}</OtherLiveChatText>
        <OtherLiveChatTimeStamp>
          {formattedDate.HH_MM_SS}
        </OtherLiveChatTimeStamp>
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
