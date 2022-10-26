import { Box, Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RootContext } from "../../../../hooks/context/RootContext";
import { usePostQuestionPostCommentMutation } from "../../../../hooks/queries/questionPost/usePostQuestionPostCommentMutation";
import { getCookieValue } from "../../../../utils";

export const PostCommentInput = () => {
  const { id, userName } = useContext(RootContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPostId = Number(searchParams.get("id"));
  const { enqueueSnackbar } = useSnackbar();
  const [inputComment, setInputComment] = useState<string>("");
  const [holdShift, setHoldShift] = useState<boolean>(false);
  const [disableEnterSubmit, setDisableEnterSubmit] = useState<boolean>(false);

  const postQuestionPostComment = usePostQuestionPostCommentMutation(
    selectedPostId,
    setInputComment
  );

  const submitComment = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token || !userName || !id) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    if (inputComment.trim().length === 0) {
      enqueueSnackbar("내용을 입력해주세요", { variant: "warning" });
      return;
    }
    postQuestionPostComment.mutate({
      token,
      commentForm: {
        author: userName,
        authorId: id,
        commentLevel: 0,
        postId: selectedPostId,
        comment: inputComment,
      },
    });
  }, [userName, id, inputComment, postQuestionPostComment]);

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift" && holdShift) {
      setHoldShift(false);
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift") {
      setHoldShift(true);
      return;
    }
    if (
      event.key === "Enter" &&
      !holdShift &&
      !event.nativeEvent.isComposing &&
      !disableEnterSubmit
    ) {
      submitComment();
      return;
    }
  };

  const handleCommentSubmitButton = () => {
    submitComment();
  };

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {userName}
        </Typography>
        <TextField
          multiline
          rows={3}
          size="small"
          variant="outlined"
          fullWidth
          value={inputComment}
          onTouchStart={() => {
            setDisableEnterSubmit(true);
          }}
          onChange={handleCommentInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1 }}>
        <Button variant="contained" onClick={handleCommentSubmitButton}>
          작성하기
        </Button>
      </Box>
    </>
  );
};

export default PostCommentInput;
