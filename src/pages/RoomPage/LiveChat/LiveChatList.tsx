import { styled } from "@mui/system";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from "./LiveChatElement";
import { useParams } from "react-router-dom";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import InfinityScroll from "../../../commonElements/InfinityScroll";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { ChatSocketCacheEntity } from "../../../hooks/queries/liveChat";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatElement from "./LiveChatElement";
import { GetPreviousChatListQueryParams } from "../../../hooks/queries/liveChat/emitPreviousChatListRequest";
import { Socket } from "socket.io-client";

interface LiveChatListProps {
  getPreviousChatList: (
    socketQueryData: GetPreviousChatListQueryParams
  ) => void;
}

const PREV_CHAT_FETCH_LIMIT = 10;

export const LiveChatList = ({
  getPreviousChatList,
}: LiveChatListProps): JSX.Element => {
  const { roomId } = useParams();
  const { userId } = useContext(RootContext);
  const [latestChat, setLatestChat] = useState<ChatElement>();
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  const { status, data, isFetched } = useQuery<ChatSocketCacheEntity>(
    ["liveChat", roomId],
    {
      initialData: {
        chatList: [],
        latestChatIndex: -1,
      },
    }
  );

  const checkLatestChat = () => {
    if (!data) return;
    setLatestChat(data.chatList[data.chatList.length - 1]);
  };

  const scrollToBottom = () => {
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
      // behavior: "smooth",
    });
  };

  useEffect(checkLatestChat, [data]);
  useEffect(scrollToBottom, [latestChat]);

  const [chatListHeight, setChatListHeight] = useState<number>(0);

  useEffect(() => {
    if (!liveChatContainerRef.current) return;
    liveChatContainerRef.current.scrollTo({
      top: liveChatContainerRef.current.scrollHeight - chatListHeight,
    });
    setChatListHeight(liveChatContainerRef.current.scrollHeight);
  }, [data, liveChatContainerRef]);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          if (data !== undefined) {
            const timer = window.setInterval(() => {
              console.log("스크롤 감지 반복요청");
              getPreviousChatList({
                roomId,
                userId,
                limit: PREV_CHAT_FETCH_LIMIT,
                targetTimeStamp:
                  data?.chatList.length === 0
                    ? "latest"
                    : data.chatList[0].createdAt.toString(),
                sendTime: timer,
              });
            }, 500);
          }
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
  }, [liveChatContainerRef, data]);

  useEffect(() => {
    if (
      !liveChatContainerRef.current ||
      liveChatContainerRef.current.children.length === 0
    )
      return;
    if (!data || data.chatList.length === 0) return;
    console.log("관찰시작", liveChatContainerRef.current.children[0]);

    observer.observe(liveChatContainerRef.current.children[0]);

    return () => {
      if (!liveChatContainerRef.current || !observer) return;
      observer.unobserve(liveChatContainerRef.current);
    };
  }, [liveChatContainerRef, data, observer]);

  return (
    <>
      <LiveChatListContainer ref={liveChatContainerRef}>
        {status === "loading" || data === undefined ? (
          <CircularProgress />
        ) : (
          <>
            {data.chatList.map((chatElement, index) => {
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
        )}
        {/* {status === "loading" || data === undefined ? (
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
                  key={`${elementProps.createdAt}-${index}`}
                  userId={userId}
                  chatElement={elementProps}
                  isContinuous={false}
                />
              );
            }}
          />
        )} */}
      </LiveChatListContainer>
      {/* <button
        onClick={() => {
          console.log(data);
        }}
      >
        확인
      </button> */}
    </>
  );
};

const LiveChatListContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 1),
  backgroundColor: SignatureColor.WHITE,
  height: `calc(100vh - ${theme.spacing(22)})`,
  maxHeight: `calc(100vh - ${theme.spacing(22)})`,
  overflow: "scroll",
}));

export default memo(LiveChatList);
