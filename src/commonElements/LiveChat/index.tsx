import { Box, Modal, SxProps } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { MyChat, OtherChat } from "./ChatElement";
import { ChatInput } from "./ChatInput";

export type Chat = {
  id: number;
  createdAt: string;
  text: string;
  imageUrlList: string[];
  author: {
    id: string;
    userName: string;
  };
};

interface LiveChatProps {
  sendChat: (text: string, imageUrlList?: string[]) => void;
  renewOldestChat: () => void;
  chatList: Chat[];
  userId?: string;
  roomId?: number | string;
  height?: string | number;
  isLoading?: boolean;
}
const CHAT_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 0,
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
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [zoomInImageUrl, setZoomInImageUrl] = useState<string>("");

  const handleImageModalClose = () => setIsImageModalOpen(false);
  const imageSelect = useCallback((imageUrl: string) => {
    setZoomInImageUrl(imageUrl);
    setIsImageModalOpen(true);
  }, []);

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
        {/* {chatList.map((chat, index) => {
          if (chat.author.id === userId)
            return (
              <MyChat
                key={chat.id}
                chat={chat}
                isDateChange={
                  new Date(chat.createdAt).getDate() !==
                  new Date(chatList[index - 1]?.createdAt).getDate()
                }
                isContinuous={
                  new Date(chat.createdAt).getMinutes() ===
                  new Date(chatList[index + 1]?.createdAt).getMinutes()
                }
                imageSelect={imageSelect}
              />
            );
          return (
            <OtherChat
              key={chat.id}
              chat={chat}
              isDateChange={
                new Date(chat.createdAt).getDate() !==
                new Date(chatList[index - 1]?.createdAt).getDate()
              }
              samePrevUser={chatList[index - 1]?.author.id === chat.author.id}
              sameNextUser={chatList[index + 1]?.author.id === chat.author.id}
              isContinuous={
                new Date(chat.createdAt).getMinutes() ===
                new Date(chatList[index + 1]?.createdAt).getMinutes()
              }
              imageSelect={imageSelect}
            />
          );
        })} */}
        <ChatList
          userId={userId}
          chatList={chatList}
          imageSelect={imageSelect}
        />
      </Box>

      <ChatInput userId={userId} roomId={roomId} sendChat={sendChat} />

      <Modal open={isImageModalOpen} onClose={handleImageModalClose}>
        <img
          src={zoomInImageUrl}
          style={{
            position: "absolute",
            maxWidth: "80vw",
            maxHeight: "80vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
            padding: 4,
            display: "flex",
            flexFlow: "column",
            backgroundColor: SignatureColor.WHITE,
            cursor: "pointer",
          }}
          onClick={handleImageModalClose}
        />
      </Modal>
    </Box>
  );
};

interface ChatListProps {
  userId?: string;
  chatList: Chat[];
  imageSelect: (imageUrl: string) => void;
}

const ChatList = ({ userId, chatList, imageSelect }: ChatListProps) => {
  return (
    <>
      {chatList.map((chat, index) => {
        if (chat.author.id === userId)
          return (
            <MyChat
              key={chat.id}
              chat={chat}
              isDateChange={
                new Date(chat.createdAt).getDate() !==
                new Date(chatList[index - 1]?.createdAt).getDate()
              }
              isContinuous={
                new Date(chat.createdAt).getMinutes() ===
                new Date(chatList[index + 1]?.createdAt).getMinutes()
              }
              imageSelect={imageSelect}
            />
          );
        return (
          <OtherChat
            key={chat.id}
            chat={chat}
            isDateChange={
              new Date(chat.createdAt).getDate() !==
              new Date(chatList[index - 1]?.createdAt).getDate()
            }
            samePrevUser={chatList[index - 1]?.author.id === chat.author.id}
            sameNextUser={chatList[index + 1]?.author.id === chat.author.id}
            isContinuous={
              new Date(chat.createdAt).getMinutes() ===
              new Date(chatList[index + 1]?.createdAt).getMinutes()
            }
            imageSelect={imageSelect}
          />
        );
      })}
    </>
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
