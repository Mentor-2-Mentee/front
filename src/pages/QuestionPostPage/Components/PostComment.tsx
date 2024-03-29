import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CommentView from "../../../commonElements/CommentView";
import { RootContext } from "../../../hooks/context/RootContext";
import { useDeleteQuestionPostCommentMutation } from "../../../hooks/queries/questionPost/useDeleteQuestionPostCommentMutation";
import { useGetQuestionPostCommentQuery } from "../../../hooks/queries/questionPost/useGetQuestionPostCommentQuery";
import { usePostQuestionPostCommentMutation } from "../../../hooks/queries/questionPost/usePostQuestionPostCommentMutation";
import { getCookieValue } from "../../../utils";

export const PostComment = () => {
  const { id, userName } = useContext(RootContext);
  const [searchParams, _] = useSearchParams();
  const selectedPostId = Number(searchParams.get("id"));
  const { enqueueSnackbar } = useSnackbar();

  const questionPostComment = useGetQuestionPostCommentQuery({
    questionPostId: selectedPostId,
  });

  const postQuestionPostComment =
    usePostQuestionPostCommentMutation(selectedPostId);
  const deleteQuestionPostComment = useDeleteQuestionPostCommentMutation(
    selectedPostId,
    enqueueSnackbar
  );

  const submitComment = useCallback(
    (inputValue: string) => {
      const token = getCookieValue("accessToken");
      if (!token || !userName || !id) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }
      if (inputValue.trim().length === 0) return;
      postQuestionPostComment.mutate({
        token,
        commentForm: {
          author: userName,
          authorId: id,
          commentLevel: 0,
          questionPostId: selectedPostId,
          comment: inputValue,
        },
      });
    },
    [userName, id, postQuestionPostComment]
  );

  const deleteComment = useCallback((commentId: number) => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    deleteQuestionPostComment.mutate({
      token,
      commentId,
    });
  }, []);

  if (questionPostComment.status === "loading") return <div>Loading...</div>;
  if (questionPostComment.status === "error") return <div>Error</div>;

  return (
    <Box sx={{ mt: 2 }}>
      <CommentView
        commentList={questionPostComment.data.commentList}
        userId={id}
        userName={userName}
        submitCallback={submitComment}
        deleteCallback={deleteComment}
      />
    </Box>
  );
};

export default PostComment;
