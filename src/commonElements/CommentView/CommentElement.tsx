import { Box, IconButton, SxProps, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Comment } from ".";
import { SignatureColor } from "../../commonStyles/CommonColor";
import DateFormatting from "../../utils/dateFormatting";

interface CommentElementProps {
  userId?: string;
  comment: Comment;
  deleteCallback: (commentId: number) => void;
}

export const CommentElement = ({
  userId,
  comment,
  deleteCallback,
}: CommentElementProps) => {
  const handleDeleteButton = (commentId: number) => () => {
    deleteCallback(commentId);
  };

  const reformedCreatedAt = new DateFormatting(new Date(comment.createdAt));
  return (
    <Box sx={CommentElementBoxSxProps}>
      <IconButton
        className="deleteIcon"
        size="small"
        sx={{
          position: "absolute",
          right: 0,
          visibility: userId === comment.authorId ? "visible" : "hidden",
        }}
        onClick={handleDeleteButton(comment.id)}
      >
        <DeleteIcon />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        {comment.author}
      </Typography>
      <Typography variant="body1" whiteSpace={"pre"}>
        {comment.comment}
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

export default CommentElement;
