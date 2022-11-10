import { Box, SxProps, Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";
import CommentElement from "./CommentElement";
import CommentInput from "./CommentInput";

export type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  commentLevel?: number;
  parentCommentId?: number;
  comment: string;
  author: string;
  authorId: string;
};

interface CommentProps {
  userId?: string;
  userName?: string;
  commentList: Comment[];
  isFlatten?: boolean;
  submitCallback: (inputComment: string) => void;
  deleteCallback: (commentId: number) => void;
}

/**
 * @param isFlatten 댓글표기방법. true일시 대댓글 기능없음. default true, 현재 대댓글기능 미구현
 */
export const CommentView = ({
  userId,
  userName,
  commentList,
  isFlatten = true,
  submitCallback,
  deleteCallback,
}: CommentProps) => {
  return (
    <Box sx={CommentListBoxSxProps}>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        {`댓글 ${commentList.length}`}
      </Typography>
      {commentList.map((comment) => {
        return (
          <CommentElement
            key={comment.id}
            userId={userId}
            comment={comment}
            deleteCallback={deleteCallback}
          />
        );
      })}
      <CommentInput userName={userName} submitCallback={submitCallback} />
    </Box>
  );
};

const CommentListBoxSxProps: SxProps = {
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 1.5,
  p: 1,
};

export default CommentView;
