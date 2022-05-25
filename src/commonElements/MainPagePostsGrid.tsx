import { styled } from "@mui/system";
import { MainPagePostsParams } from "../components/MainPage/MainPageUserData";
import LiveAlarmBox from "./LiveAlarmBox";

interface MainPagePostsGridProps {
  postsList: MainPagePostsParams[];
}

export const MainPagePostsGrid = ({
  postsList,
}: MainPagePostsGridProps): JSX.Element => {
  return (
    <div>
      {postsList.map((post) => {
        return (
          <MainPagePostElement
            postTitle={post.postTitle}
            commentsCount={post.commentsCount}
            isLive={post.isLive}
            isClosed={post.isClosed}
          />
        );
      })}
    </div>
  );
};

export const MainPagePostElement = ({
  postTitle,
  commentsCount,
  isLive,
  isClosed,
}: MainPagePostsParams): JSX.Element => {
  return (
    <PostElementContainer>
      <div>{postTitle}</div>
      {commentsCount !== 0 && <div>{commentsCount}</div>}
      {isLive && <LiveAlarmBox />}
      {!isLive && isClosed && <div>CLOSED</div>}
    </PostElementContainer>
  );
};

const PostElementContainer = styled("div")(({ theme }) => ({
  display: "flex",
  //   width:
}));
