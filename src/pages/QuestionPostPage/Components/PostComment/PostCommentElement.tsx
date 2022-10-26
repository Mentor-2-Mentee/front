import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { QuestionPostComment } from "../../../../hooks/queries/questionPost";
import DateFormatting from "../../../../utils/dateFormatting";
import DeleteIcon from "@mui/icons-material/Delete";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useDeleteQuestionPostCommentMutation } from "../../../../hooks/queries/questionPost/useDeleteQuestionPostCommentMutation";
import { useSnackbar } from "notistack";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../../../../hooks/context/RootContext";
import { getCookieValue } from "../../../../utils";

interface PostCommentProps {
  commentElement: QuestionPostComment;
}

export const PostCommentElement = ({ commentElement }: PostCommentProps) => {
  const { id, userName } = useContext(RootContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPostId = Number(searchParams.get("id"));
  const { enqueueSnackbar } = useSnackbar();
  const reformedCreatedAt = new DateFormatting(
    new Date(commentElement.createdAt)
  );

  const deleteQuestionPostComment = useDeleteQuestionPostCommentMutation(
    selectedPostId,
    enqueueSnackbar
  );

  const handleCommentDeleteButton = (commentId: number) => () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    deleteQuestionPostComment.mutate({
      token,
      commentId,
    });
  };

  return (
    <Box key={commentElement.id} sx={CommentElementBoxSxProps}>
      <IconButton
        className="deleteIcon"
        size="small"
        sx={{
          position: "absolute",
          right: 0,
          visibility: id === commentElement.authorId ? "visible" : "hidden",
        }}
        onClick={handleCommentDeleteButton(commentElement.id)}
      >
        <DeleteIcon />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        {commentElement.author}
      </Typography>
      <Typography variant="body1" whiteSpace={"pre"}>
        {commentElement.comment}
      </Typography>
      <Typography variant="body2" maxWidth={"70%"}>
        {`${reformedCreatedAt.YYYY_MM_DD} ${reformedCreatedAt.HH_MM_SS}`}
      </Typography>
    </Box>
  );
};

const CommentElementBoxSxProps: SxProps = {
  borderBottom: `2px solid ${SignatureColor.BLACK_30}`,
  m: 1,
  width: "100%",
  position: "relative",
};

export default PostCommentElement;
