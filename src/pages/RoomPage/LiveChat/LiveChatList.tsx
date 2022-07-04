import { styled } from "@mui/system";
import { ChatColor, SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from ".";
import DateFormatting from "../../../utils/dateFormatting";

import { memo } from "react";

interface LiveChatListProps {
  chatList: ChatElement[];
  userId?: string;
}

export const LiveChatList = ({
  chatList,
  userId,
}: LiveChatListProps): JSX.Element => {
  return (
    <LiveChatListContainer>
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
  // const uid = "asdf"; // context api로 전달받아야함
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
  "&::-webkit-scrollbar": {
    display: "none",
  },
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
