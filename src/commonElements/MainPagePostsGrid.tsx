import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MainPagePostsParams } from "../components/MainPage/MainPageUserData";
import LiveAlarmBox from "./LiveAlarmBox";
import ChatCountBox from "./CommentsCountBox";

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
  backgroundColor: "rgba(0,0,0,0.2)",
  borderRadius: 5,
  margin: theme.spacing(1),
}));

const CreateNewPostButton = styled("button")(({ theme }) => ({
  border: "1px dashed black",
  borderRadius: 5,
  alignItems: "center",
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
      <PostTitle>{postTitle}</PostTitle>
      {commentsCount !== 0 && (
        <CommentsCount>
          <ChatCountBox commentsCount={commentsCount} />
        </CommentsCount>
      )}
      {isLive && <LiveAlarmBox />}
      {!isLive && isClosed && <div>CLOSED</div>}
    </PostElementContainer>
  );
};

const PostElementContainer = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: 5,
  margin: theme.spacing(1, 1, 0, 1),
  padding: theme.spacing(0.5),
  alignItems: "center",
}));

const PostTitle = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  maxWidth: "15vw",
  flex: 1,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "white",
}));

const CommentsCount = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 1),
}));
