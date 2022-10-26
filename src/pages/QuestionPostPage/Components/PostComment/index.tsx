import { Box, SxProps, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { useGetQuestionPostCommentQuery } from "../../../../hooks/queries/questionPost/useGetQuestionPostCommentQuery";
import PostCommentElement from "./PostCommentElement";
import PostCommentInput from "./PostCommentInput";

export const PostComment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPostId = Number(searchParams.get("id"));

  const questionPostComment = useGetQuestionPostCommentQuery({
    questionPostId: selectedPostId,
  });

  if (questionPostComment.status === "loading") return <div>Loading...</div>;
  if (questionPostComment.status === "error") return <div>Error</div>;

  return (
    <Box sx={CommentListBoxSxProps}>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        {`댓글 ${questionPostComment.data.commentList.length}`}
      </Typography>
      {questionPostComment.data.commentList.map((commentElement) => {
        return (
          <PostCommentElement
            key={commentElement.id}
            commentElement={commentElement}
          />
        );
      })}
      <PostCommentInput />
    </Box>
  );
};

const CommentListBoxSxProps: SxProps = {
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
  p: 2,
};

export default PostComment;
