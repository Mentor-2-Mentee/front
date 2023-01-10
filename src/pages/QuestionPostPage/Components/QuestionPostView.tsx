import { Box, Button, CircularProgress, SxProps } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
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

type PostButtonType = "PostModify" | "QuestionModify" | "Delete";

const QuestionPostView = ({ postId }: QuestionPostViewProps) => {
  const { id } = useContext(RootContext);
  const { data: questionPostData, status: getQuestionPostQueryStatus } =
    useGetQuestionPostQuery({ postId });

  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedPostId = Number(searchParams.get("id"));
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deleteQuestionPostMutate } = useDeleteQuestionPostMutation(
    enqueueSnackbar,
    navigation
  );

  if (getQuestionPostQueryStatus === "loading") return <CircularProgress />;
  if (getQuestionPostQueryStatus === "error")
    return <div>삭제된 게시글입니다.</div>;

  const {
    title,
    description,
    author,
    createdAt,
    viewCount,
    question,
    guestName,
  } = questionPostData;

  // const handlePostHandleButton = (buttonType: PostButtonType) => () => {
  //   if (id !== author?.id) return;
  //   switch (buttonType) {
  //     case "QuestionReWrite":
  //       navigation(
  //         `/question/rewrite?target=question&id=${question.id}&page=${nowPage}`
  //       );
  //       break;

  //     case "PostRewrite":
  //       navigation(
  //         `/question/rewrite?target=post&id=${selectedPostId}&page=${nowPage}`
  //       );
  //       break;

  //     case "Delete":
  //       const token = getCookieValue("accessToken");
  //       if (!token) {
  //         enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
  //         return;
  //       }
  //       const response = confirm(
  //         "삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다"
  //       );
  //       if (!response) return;
  //       deleteQuestionPostMutate({
  //         token,
  //         questionPostId: postId,
  //       });

  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const buttonDisable = useCallback(
  //   (id?: string) => {
  //     if (author === null) return false;
  //     if (author.id === id) return false;
  //     return true;
  //   },
  //   [author]
  // );

  // const handleDeleteButton = useCallback(() => {
  //   if (author === null) {
  //     deleteQuestionPostMutate({
  //       questionPostId: postId,
  //     });
  //   }
  // }, [deleteQuestionPostMutate, author]);

  // 버튼이 나와야할때 : 같은유저거나, guest일때
  // 안나와야할때 : 작성자가 회원이고 같은유저가 아닐때

  const isDisabled = guestName === null && author !== null && author.id !== id;
  const handleModifyButton: React.MouseEventHandler = () => {
    navigation(
      `/question/modify?target=post&id=${selectedPostId}&page=${nowPage}`
    );
  };
  const handleDeleteButton: React.MouseEventHandler = () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    const response = confirm(
      "삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다"
    );
    if (!response) return;
    deleteQuestionPostMutate({
      token,
      questionPostId: postId,
    });
  };

  return (
    <>
      <PostView
        postViewData={{
          postId,
          tag: question.rootTag,
          detailTag: question.detailTag,
          title,
          description,
          author: author?.userName || guestName || "guest",
          createdAt,
          viewCount,
        }}
        upperBody={<QuestionView question={question} />}
      />

      <Box sx={HandleButtonBoxSxProps}>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleModifyButton}
          sx={{ mr: 1 }}
        >
          글 수정
        </Button>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleDeleteButton}
          // onClick={handlePostHandleButton("Delete")}
        >
          삭제
        </Button>
      </Box>

      <PostComment />
    </>
  );
};

const HandleButtonBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "end",
  mt: 1,
  mb: 1,
};

export default QuestionPostView;
