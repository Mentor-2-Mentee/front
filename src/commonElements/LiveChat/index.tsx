import { Box, SxProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { MyChat, OtherChat } from "./ChatElement";
import { ChatInput } from "./ChatInput";
import DateSeparator from "./DateSeparator";

export type Chat = {
  id: number;
  createdAt: string;
  text: string;
  imageUrl?: string | null;
  author: {
    id: string;
    userName: string;
  };
};

interface LiveChatProps {
  sendChat: (text: string, imageUrl?: string) => void;
  renewOldestChat: () => void;
  chatList: Chat[];
  userId?: string;
  roomId?: number | string;
  height?: string | number;
  isLoading?: boolean;
}
const CHAT_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
};

export const LiveChat = ({
  chatList,
  userId,
  roomId,
  height,
  isLoading,
  sendChat,
  renewOldestChat,
}: LiveChatProps) => {
  const liveChatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!liveChatBoxRef.current) return;
    liveChatBoxRef.current.scrollTo({
      top: liveChatBoxRef.current.scrollHeight,
    });
  }, [liveChatBoxRef.current]);

  const observer = useMemo(() => {
    return new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        renewOldestChat();
        observer.disconnect();
      }
    }, CHAT_OBSERVER_OPTION);
  }, [liveChatBoxRef, chatList]);

  const observingTarget = () => {
    if (!liveChatBoxRef.current) return;
    if (liveChatBoxRef.current.children.length === 0) return;
    if (chatList.length === 0) return;

    observer.observe(liveChatBoxRef.current.children[0]);

    return cleanUpCurrentObserve;
  };

  const cleanUpCurrentObserve = () => {
    if (!observer) return;
    if (!liveChatBoxRef.current) return;
    observer.unobserve(liveChatBoxRef.current);
  };

  useEffect(observingTarget, [liveChatBoxRef, chatList, observer]);
  useEffect(() => {
    if (chatList.length === 0) return;
    if (chatList[chatList.length - 1].author.id === userId) {
      scrollToBottom();
    }
  }, [scrollToBottom, chatList, userId]);

  return (
    <Box sx={LiveChatBoxSxProps(height)}>
      <Box ref={liveChatBoxRef} sx={LiveChatListBoxSxProps}>
        {chatList.map((chat, index) => {
          const isDateChange =
            new Date(chat.createdAt).getDate() !==
            new Date(chatList[index - 1]?.createdAt).getDate();

          if (chat.author.id === userId)
            return (
              <>
                {isDateChange ? (
                  <DateSeparator timeStamp={chat.createdAt} />
                ) : null}
                <MyChat
                  key={chat.id}
                  chat={chat}
                  isContinuous={
                    new Date(chat.createdAt).getMinutes() ===
                    new Date(chatList[index + 1]?.createdAt).getMinutes()
                  }
                />
              </>
            );
          return (
            <>
              {isDateChange ? (
                <DateSeparator timeStamp={chat.createdAt} />
              ) : null}
              <OtherChat
                key={chat.id}
                chat={chat}
                samePrevUser={chatList[index - 1]?.author.id === chat.author.id}
                sameNextUser={chatList[index + 1]?.author.id === chat.author.id}
                isContinuous={
                  new Date(chat.createdAt).getMinutes() ===
                  new Date(chatList[index + 1]?.createdAt).getMinutes()
                }
              />
            </>
          );
        })}
      </Box>

      <ChatInput userId={userId} roomId={roomId} sendChat={sendChat} />
    </Box>
  );
};

const LiveChatBoxSxProps = (height?: string | number): SxProps => ({
  display: "flex",
  flexFlow: "column",
  borderRadius: 1,
  backgroundColor: SignatureColor.GRAY_BORDER,
  height: height || "100%",
});

const LiveChatListBoxSxProps: SxProps = {
  mt: 1,
  ml: 1,
  mr: 1,
  flex: 1,
  pt: 1,
  backgroundColor: SignatureColor.WHITE,
  overflow: "scroll",
  position: "relative",
};

export default LiveChat;
