import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
import CommentView from "../../../../commonElements/CommentView";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useDeleteExamQuestionCommentMutation } from "../../../../hooks/queries/examReviewRoom/useDeleteExamQuestionCommentMutation";
import { useGetExamQuestionCommentQuery } from "../../../../hooks/queries/examReviewRoom/useGetExamQuestionCommentQuery";
import { usePostExamQuestionCommentMutation } from "../../../../hooks/queries/examReviewRoom/usePostExamQuestionCommentMutation";
import { getCookieValue } from "../../../../utils";

interface QuestionComment {
  examQuestionId: number;
}

export const ExamQuestionComment = ({ examQuestionId }: QuestionComment) => {
  const { id, userName } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();

  const examQuestionComment = useGetExamQuestionCommentQuery({
    examQuestionId,
  });

  const postExamQuestionComment =
    usePostExamQuestionCommentMutation(examQuestionId);

  const deleteExamQuestionComment = useDeleteExamQuestionCommentMutation(
    examQuestionId,
    enqueueSnackbar
  );

  const submitComment = useCallback(
    (inputValue: string) => {
      const token = getCookieValue("accessToken");
      if (!token || !id || !userName) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }
      if (inputValue.trim().length === 0) return;
      postExamQuestionComment.mutate({
        token,
        commentForm: {
          author: userName,
          authorId: id,
          commentLevel: 0,
          examQuestionId,
          comment: inputValue,
        },
      });
    },
    [id, userName, postExamQuestionComment]
  );

  const deleteComment = useCallback(
    (commentId: number) => {
      const token = getCookieValue("accessToken");
      if (!token || !id || !userName) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }
      deleteExamQuestionComment.mutate({
        token,
        commentId,
      });
    },
    [id, userName, deleteExamQuestionComment]
  );

  if (examQuestionComment.status === "loading") return <div>Loading...</div>;
  if (examQuestionComment.status === "error") return <div>Error...</div>;

  return (
    <Box sx={{ mt: 2 }}>
      <CommentView
        commentList={examQuestionComment.data.commentList}
        userId={id}
        userName={userName}
        submitCallback={submitComment}
        deleteCallback={deleteComment}
      />
    </Box>
  );
};

export default ExamQuestionComment;
