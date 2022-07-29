import { styled } from "@mui/system";
import { ChatColor, SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from "./LiveChatElement";
import DateFormatting from "../../../utils/dateFormatting";
import { useParams } from "react-router-dom";
import { memo, useContext, useEffect, useRef, useState } from "react";
import InfinityScroll from "../../../commonElements/InfinityScroll";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { ChatSocketCacheEntity } from "../../../hooks/queries/liveChat";
import { RootContext } from "../../../hooks/context/RootContext";
import LiveChatElement from "./LiveChatElement";

export const LiveChatList = (): JSX.Element => {
  const { roomId } = useParams();
  const { userId } = useContext(RootContext);

  const [latestChat, setLatestChat] = useState<ChatElement>();
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    liveChatContainerRef.current?.scrollTo({
      top: liveChatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const { status, data } = useQuery<ChatSocketCacheEntity>([
    "liveChat",
    roomId,
  ]);

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

const LiveChatListContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 1),
  backgroundColor: SignatureColor.WHITE,
  height: `calc(100vh - ${theme.spacing(22)})`,
  maxHeight: `calc(100vh - ${theme.spacing(22)})`,
  overflow: "scroll",
}));

export default memo(LiveChatList);
