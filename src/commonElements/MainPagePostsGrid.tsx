import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MainPagePostsParams } from "../components/MainPage/MainPageUserData";
import LiveAlarmBox from "./LiveAlarmBox";
import ChatCountBox from "./CommentsCountBox";
import { MainPageContentsColor, SignitureColor } from "../commonStyles/color";

interface MainPagePostsGridProps {
  postsList: MainPagePostsParams[];
}

export const MainPagePostsGrid = ({
  postsList,
}: MainPagePostsGridProps): JSX.Element => {
  return (
    <MainPagePostsGridContainer>
      {postsList.slice(0, 5).map((post) => {
        return (
          <MainPagePostElement
            postTitle={post.postTitle}
            commentsCount={post.commentsCount}
            isLive={post.isLive}
            isClosed={post.isClosed}
          />
        );
      })}
      <CreateNewPostButton>+</CreateNewPostButton>
      <div />
      <Typography
        variant="subtitle2"
        component="div"
        sx={{ ml: "auto", mt: 1, mr: 2, mb: 1 }}
      >
        {"더 보기 >"}
      </Typography>
    </MainPagePostsGridContainer>
  );
};

const MainPagePostsGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 50%)",
  border: `1px solid ${MainPageContentsColor.BORDER}`,
  borderRadius: 5,
  margin: theme.spacing(1),
}));

const CreateNewPostButton = styled("button")(({ theme }) => ({
  border: `2px dashed ${MainPageContentsColor.BORDER}`,
  borderRadius: 5,
  alignItems: "center",
  fontSize: 18,
  fontWeight: "bold",
  margin: theme.spacing(1, 1, 0, 1),
  padding: theme.spacing(0.5),
}));

export const MainPagePostElement = ({
  postTitle,
  commentsCount,
  isLive,
  isClosed,
}: MainPagePostsParams): JSX.Element => {
  return (
    <PostElementContainer>
      <PostTitle
        sx={
          {
            // width:
          }
        }
      >
        {postTitle}
      </PostTitle>
      {commentsCount !== 0 && (
        <CommentsCount>
          <ChatCountBox commentsCount={commentsCount} />
        </CommentsCount>
      )}
      {isLive ? <LiveAlarmBox /> : null}
      {!isLive && isClosed ? <ClosedBox>CLOSED</ClosedBox> : null}
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
  minWidth: "300px",
  maxWidth: "calc((100vw - 128px - 64px) / 4 )",
}));

const PostTitle = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  flex: 1,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

const CommentsCount = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 1),
}));

const ClosedBox = styled("div")(({ theme }) => ({
  backgroundColor: SignitureColor.BLACK,
  color: SignitureColor.WHITE,
  fontWeight: "bold",
  borderRadius: 5,
  padding: theme.spacing(0.25, 1, 0.25, 1),
}));
