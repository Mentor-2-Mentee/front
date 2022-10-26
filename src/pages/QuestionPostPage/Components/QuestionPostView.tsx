import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import PostView from "../../../commonElements/PostView";
import { QuestionView } from "../../../commonElements/QuestionView";
import { RootContext } from "../../../hooks/context/RootContext";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import { useDeleteQuestionPostMutation } from "../../../hooks/queries/questionPost/useDeleteQuestionPostMutation";
import { getCookieValue } from "../../../utils";
import PostComment from "./PostComment";

interface QuestionPostViewProps {
  postId: number;
}

type PostButtonType = "PostRewrite" | "QuestionReWrite" | "Delete";

const QuestionPostView = ({ postId }: QuestionPostViewProps) => {
  const { id } = useContext(RootContext);
  const questionPostQuery = useGetQuestionPostQuery({ postId });

  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedPostId = Number(searchParams.get("id"));
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const deleteQuestionPost = useDeleteQuestionPostMutation(
    enqueueSnackbar,
    navigation
  );

  if (questionPostQuery.status === "loading") return <div>Loading...</div>;
  if (questionPostQuery.status === "error") return <div>Error</div>;

  const { title, description, author, createdAt, viewCount, question } =
    questionPostQuery.data.questionPost;

  const handlePostHandleButton = (buttonType: PostButtonType) => () => {
    if (id !== author.id) return;
    switch (buttonType) {
      case "QuestionReWrite":
        navigation(
          `/question/rewrite?target=question&id=${question.id}&page=${nowPage}`
        );
        break;

      case "PostRewrite":
        navigation(
          `/question/rewrite?target=post&id=${selectedPostId}&page=${nowPage}`
        );
        break;

      case "Delete":
        const token = getCookieValue("accessToken");
        if (!token) {
          enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
          return;
        }
        const response = confirm(
          "삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다"
        );
        if (!response) return;
        deleteQuestionPost.mutate({
          token,
          questionPostId: postId,
        });

        break;

      default:
        break;
    }
  };

  return (
    <>
      <PostView
        board="질문게시판"
        postViewData={{
          postId,
          tag: question.rootTag,
          detailTag: question.detailTag,
          title,
          description,
          author: author.userName,
          createdAt,
          viewCount,
        }}
        upperBody={<QuestionView question={question} />}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 1,
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          disabled={id !== author.id}
          onClick={handlePostHandleButton("PostRewrite")}
          sx={{ mr: 1 }}
        >
          글 수정
        </Button>
        <Button
          variant="contained"
          disabled={id !== author.id}
          onClick={handlePostHandleButton("Delete")}
        >
          삭제
        </Button>
      </Box>

      <PostComment />
    </>
  );
};

export default QuestionPostView;
