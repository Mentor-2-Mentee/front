import { styled } from "@mui/system";
import {
  MainPageContentsColor,
  SignatureColor,
} from "../../../commonStyles/CommonColor";
import ChatCountBox from "../../../commonElements/CommentsCountBox";
interface MainPagePostElementProps {
  postId: number;
  title: string;
  commentCount: number;
}

export const MainPagePostElement = ({
  title,
  commentCount,
}: MainPagePostElementProps): JSX.Element => {
  return (
    <PostElementContainer>
      <PostTitle>{title}</PostTitle>
      <CommentsCount>
        <ChatCountBox commentsCount={commentCount} />
      </CommentsCount>
      {/* {isLive ? <LiveAlarmBox /> : null} */}
      {/* {!isLive && isClosed ? <ClosedBox>CLOSED</ClosedBox> : null} */}
    </PostElementContainer>
  );
};

const PostElementContainer = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: MainPageContentsColor.USER_DATA,
  borderRadius: 5,
  margin: theme.spacing(1, 1, 0, 1),
  padding: theme.spacing(0.5),
  alignItems: "center",
  boxSizing: "border-box",
  cursor: "pointer",

  "&:hover": {
    boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
  },
}));

const PostTitle = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  flex: 1,
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

const CommentsCount = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 1),
}));
