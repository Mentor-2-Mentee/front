import {
  Box,
  Typography,
  CircularProgress,
  SxProps,
  Button,
} from "@mui/material";
import { getCookieValue } from "../../../utils";
import { useGetUserQuestionPostQuery } from "../../../hooks/queries/userProfile/useGetUserQuestionPostQuery";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useNavigate } from "react-router";
import CommentsCountBox from "../../../commonElements/CommentsCountBox";

export const MyQuestions = (): JSX.Element => {
  const navigation = useNavigate();
  const { data: userQuestionPostData, status: userQuestionPostQueryStatus } =
    useGetUserQuestionPostQuery({
      token: getCookieValue("accessToken"),
    });

  const handlePostElementClick = (postId: number) => () => {
    navigation(`/question/view?id=${postId}`);
  };
  const handleNewQuestionPostButton = () => {
    navigation("/new-question");
  };

  if (userQuestionPostQueryStatus === "loading") return <CircularProgress />;
  if (userQuestionPostQueryStatus === "error") return <div>Error</div>;

  const { questionPost } = userQuestionPostData;

  return (
    <Box>
      <Typography
        variant="h6"
        component="div"
        fontWeight={"bold"}
        sx={{ ml: 1, mb: 1 }}
      >
        {`나의 질문 (${userQuestionPostData.questionPost.length})`}
      </Typography>

      <Box sx={PostGridBoxSxProps}>
        {questionPost.slice(0, 5).map((questionPost) => {
          return (
            <Button
              sx={PostElementButtonSxProps}
              onClick={handlePostElementClick(questionPost.id)}
            >
              <Typography fontWeight={"bold"} color={SignatureColor.BLACK_80}>
                {questionPost.title}
              </Typography>
              <CommentsCountBox
                commentsCount={questionPost.postComment.length}
              />
            </Button>
          );
        })}
        <Button
          size="small"
          sx={CreateNewPostButtonSxProps}
          onClick={handleNewQuestionPostButton}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

const PostGridBoxSxProps: SxProps = {
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 2,
  margin: 1,

  display: "grid",
  gridTemplateColumns: "repeat(2, 50%)",
};

const PostElementButtonSxProps: SxProps = {
  display: "flex",
  backgroundColor: SignatureColor.GRAY,
  borderRadius: 1,
  m: 1,
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",

  "&:hover": {
    boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
  },
};

const CreateNewPostButtonSxProps: SxProps = {
  border: `2px dashed ${SignatureColor.GRAY_BORDER}`,
  backgroundColor: SignatureColor.GRAY,
  color: SignatureColor.BLACK_80,
  display: "flex",
  justifyContent: "center",
  borderRadius: 2,
  alignItems: "center",
  fontSize: 18,
  fontWeight: "bold",
  margin: 1,
  cursor: "pointer",
  "&:hover": {
    border: `2px dashed ${SignatureColor.BLACK}`,
  },
};

export default MyQuestions;
