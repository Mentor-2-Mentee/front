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

  // const getPastChatListForINF = async ({ pageParam = 0 }) => {
  //   console.log("불러올 페이지", pageParam);
  //   const response = await getPastChatList({
  //     page: pageParam,
  //     roomId,
  //     userId,
  //   });
  //   console.log("불러온페이지 데이터", response);
  //   return response;
  // };

  // const { data, error, fetchPreviousPage, hasPreviousPage, status, refetch } =
  //   useInfiniteQuery(["getPastChatList"], getPastChatListForINF, {
  //     getPreviousPageParam: (recentResponse, page) => {
  //       if (!recentResponse.previousPage) return false;
  //       return recentResponse.previousPage;
  //     },
  //     // select: (data) => ({
  //     //   pages: [...data.pages],
  //     //   pageParams: [...data.pageParams],
  //     // }),
  //   });

  // const [nowPage, setNowPage] = useState<number>(0);

  // useEffect(() => {
  //   if (!data) return;
  //   const newPastChatList: ChatElement[] = [];
  //   data.pages.map(({ data }) => {
  //     newPastChatList.push(...data);
  //   });
  //   setChatList([...newPastChatList]);
  // }, [data]);

  return (
    <LiveChatListContainer ref={liveChatContainerRef}>
      {/* {status === "loading" || data === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {data.pages.map((group, index) => {
            console.log("data.pages", data.pages);
            return (
              <InfinityScroll
                key={`chatList_${roomId}_${index}`}
                limit={CHAT_LOG_LIMIT}
                listElements={group.data}
                nowPage={
                  group.previousPage === undefined ? 0 : group.previousPage
                }
                targetContainer={liveChatContainerRef}
                fetchElementFunction={fetchPreviousPage}
                reversed
                hasNextPage={hasPreviousPage}
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
      )} */}
      {/* <InfinityScroll
        limit={CHAT_LOG_LIMIT}
        listElements={chatList}
        nowPage={nowPage}
        targetContainer={liveChatContainerRef}
        fetchElementFunction={fetchPreviousPage}
        reversed
        hasNextPage={hasPreviousPage}
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
      /> */}
      {chatList.map((chatElement, index) => {
        let isContinuous = false;

        if (index !== 0 && chatList[index].uid === chatElement.uid) {
          isContinuous = true;
        }

        return (
          <LiveChatElement
            userId={userId}
            chatElement={chatElement}
            isContinuous={isContinuous}
            key={new DateFormatting(chatElement.createAt).HH_MM_SS}
          />
        );
      })}
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
