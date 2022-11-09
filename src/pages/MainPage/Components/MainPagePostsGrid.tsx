import { Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import LiveAlarmBox from "../../../commonElements/LiveAlarmBox";
import ChatCountBox from "../../../commonElements/CommentsCountBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  MainPageContentsColor,
  SignatureColor,
} from "../../../commonStyles/CommonColor";
import { QuestionPost } from "../../../hooks/queries/questionPost";
import { useNavigate } from "react-router";

interface MainPagePostsGridProps {
  postsList: Pick<QuestionPost, "id" | "title" | "postComment">[];
}

export const MainPagePostsGrid = ({
  postsList,
}: MainPagePostsGridProps): JSX.Element => {
  const navigation = useNavigate();

  const handlePostElementClick = (postId: number) => () => {
    navigation(`/question/view?id=${postId}`);
  };

  return (
    <MainPagePostsContainer>
      <PostsGrid>
        {postsList.slice(0, 5).map((post) => {
          return (
            <div key={post.id} onClick={handlePostElementClick(post.id)}>
              <MainPagePostElement
                postId={post.id}
                title={post.title}
                commentCount={post.postComment.length}
              />
            </div>
          );
        })}
        <CreateNewPostButton
          onClick={() => {
            navigation("/new-question");
          }}
        >
          +
        </CreateNewPostButton>
      </PostsGrid>

      <Typography
        variant="subtitle2"
        component="div"
        sx={{
          display: "flex",
          mt: 1,
          mb: 1,
          mr: 2,
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "auto" }}>더 보기</div>
        <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
      </Typography>
    </MainPagePostsContainer>
  );
};

const MainPagePostsContainer = styled("div")(({ theme }) => ({
  border: `1px solid ${MainPageContentsColor.BORDER}`,
  borderRadius: 5,
  margin: theme.spacing(1),
}));

const PostsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 50%)",
}));

const CreateNewPostButton = styled("button")(({ theme }) => ({
  border: `2px dashed ${MainPageContentsColor.BORDER}`,
  borderRadius: 5,
  alignItems: "center",
  fontSize: 18,
  fontWeight: "bold",
  margin: theme.spacing(1, 1, 0, 1),
  padding: theme.spacing(0.5),
  cursor: "pointer",
  "&:hover": {
    border: `2px dashed ${SignatureColor.BLACK}`,
  },
}));

interface MainPagePostElementProps {
  postId: number;
  title: string;
  commentCount: number;
}

export const MainPagePostElement = ({
  postId,
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

const ClosedBox = styled("div")(({ theme }) => ({
  backgroundColor: SignatureColor.BLACK,
  color: SignatureColor.WHITE,
  fontWeight: "bold",
  borderRadius: 5,
  padding: theme.spacing(0.25, 1, 0.25, 1),
}));
