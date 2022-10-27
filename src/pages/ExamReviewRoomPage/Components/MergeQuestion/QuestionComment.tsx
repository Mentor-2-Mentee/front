import { Box } from "@mui/material";
import { useCallback, useContext } from "react";
import CommentView from "../../../../commonElements/CommentView";
import { RootContext } from "../../../../hooks/context/RootContext";
import { getCookieValue } from "../../../../utils";

interface QuestionComment {
  userId?: string;
  questionId: number;
}

export const QuestionComment = ({ userId, questionId }: QuestionComment) => {
  const { id, userName } = useContext(RootContext);

  return (
    <Box sx={{ mt: 2 }}>
      <CommentView
        commentList={[]}
        userId={id}
        userName={userName}
        submitCallback={() => {}}
        deleteCallback={() => {}}
      />
    </Box>
  );
};

export default QuestionComment;
