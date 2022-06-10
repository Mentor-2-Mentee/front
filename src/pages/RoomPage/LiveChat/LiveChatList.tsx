import { styled } from "@mui/system";
import { ChatColor, SignatureColor } from "../../../commonStyles/CommonColor";
import { ChatElement } from ".";
import DateFormatting from "../../../utils/DateFormatting";

interface LiveChatListProps {
  chatList: ChatElement[];
}

export const LiveChatList = ({ chatList }: LiveChatListProps): JSX.Element => {
  return (
    <LiveChatListContainer>
      {chatList.map((chatElement, index) => {
        let isContinuous = false;

        if (index !== 0 && chatList[index].uid === chatElement.uid) {
          isContinuous = true;
        }

        return (
          <LiveChatElement
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
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

export const LiveChatElement = ({
  chatElement,
  isContinuous,
}: LiveChatElementProps): JSX.Element => {
  //redux를 이용해서 현재 사용자의 uid값과 대조해서 상대는 좌측, 나는 우측에 배정해야함
  const zeroOrOne = getRandomInt(0, 2); //랜덤배정으로 임시 구현 0은 나 1는 상대방

  const formattedDate = new DateFormatting(chatElement.createAt);

  if (zeroOrOne === 0) {
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

export default LiveChatList;
