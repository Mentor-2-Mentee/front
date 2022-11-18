import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import LiveChat from "../../../commonElements/LiveChat";
import { RootContext } from "../../../hooks/context/RootContext";
import { useExamReviewRoomChatSocketQuery } from "../../../hooks/queries/examReviewRoomChat";
import { useGetChatListQuery } from "../../../hooks/queries/examReviewRoomChat/useGetChatListQuery";
import { useGetPrevChatListQuery } from "../../../hooks/queries/examReviewRoomChat/useGetPrevChatListQuery";
import { getCookieValue } from "../../../utils";
// import { LiveChat as LiveChatBaseComponent } from "../../RoomPage/LiveChat";

interface RoomChatProps {
  sendChat: (value: any) => void;
}

export const RoomChat = ({ sendChat }: RoomChatProps) => {
  const { id } = useContext(RootContext);
  const params = useParams();
  const examReviewRoomId = Number(params.examReviewRoomId);
  const [oldestChatId, setOldestChatId] = useState<number>(-1);

  const { isLoading: loadingPrevChat } = useGetPrevChatListQuery({
    token: getCookieValue("accessToken"),
    examReviewRoomId,
    oldestChatId,
    limit: 10,
  });

  const { data: chatList } = useGetChatListQuery(examReviewRoomId);

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
    console.log(chatList[0].id, "으로 갱신");
    setOldestChatId(chatList[0].id);
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
      />
    </Box>
  );
};

export default RoomChat;
