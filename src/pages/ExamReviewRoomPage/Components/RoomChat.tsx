import { Box } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useParams } from "react-router";
import LiveChat from "../../../commonElements/LiveChat";
import { RootContext } from "../../../hooks/context/RootContext";
import { useGetChatListQuery } from "../../../hooks/queries/examReviewRoomChat/useGetChatListQuery";
import { useGetPrevChatListQuery } from "../../../hooks/queries/examReviewRoomChat/useGetPrevChatListQuery";
import { getCookieValue } from "../../../utils";

interface RoomChatProps {
  sendChat: (value: any) => void;
}

export const RoomChat = ({ sendChat }: RoomChatProps) => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params["examReviewRoomId"]);
  const [oldestChatId, setOldestChatId] = useState<number>(-1);

  const { data: prevChatList, isLoading: loadingPrevChat } =
    useGetPrevChatListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
      oldestChatId,
      limit: 15,
    });

  const { data: chatList } = useGetChatListQuery(examReviewRoomId);

  const getPrevChatList = useCallback(() => {
    return prevChatList;
  }, [prevChatList]);

  const sendChatCallback = useCallback(
    (text: string, imageUrlList?: string[]) => {
      if (!id) return;
      sendChat({
        examReviewRoomId,
        text,
        imageUrlList,
        userId: id,
      });
    },
    [sendChat, id, examReviewRoomId]
  );

  const renewOldestChat = useCallback(() => {
    if (chatList.length === 0) return;
    setOldestChatId(chatList[chatList.length - 1].id);
  }, [chatList]);

  return (
    <Box
      sx={(theme) => ({
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(17)} )`,
      })}
    >
      <LiveChat
        userId={id}
        roomId={examReviewRoomId}
        chatList={chatList}
        height={"100%"}
        sendChat={sendChatCallback}
        renewOldestChat={renewOldestChat}
        isLoading={loadingPrevChat}
        getPrevChatList={getPrevChatList}
      />
    </Box>
  );
};

export default RoomChat;
