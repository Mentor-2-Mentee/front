import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CommentInputProps {
  userName?: string;
  submitCallback: (inputComment: string) => void;
}

export const CommentInput = ({
  userName,
  submitCallback,
}: CommentInputProps) => {
  const [inputComment, setInputComment] = useState<string>("");
  const [holdShift, setHoldShift] = useState<boolean>(false);
  const [disableEnterSubmit, setDisableEnterSubmit] = useState<boolean>(false);

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift" && holdShift) {
      setHoldShift(false);
      return;
    }
    if (
      event.key === "Enter" &&
      !holdShift &&
      !event.nativeEvent.isComposing &&
      !disableEnterSubmit
    ) {
      submitCallback(inputComment);
      setInputComment("");
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift") {
      setHoldShift(true);
      return;
    }
  };

  const handleButtonClick = () => {
    submitCallback(inputComment);
    setInputComment("");
  };

  const disableEnterTriggerOnMobile = () => setDisableEnterSubmit(true);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {userName === undefined ? "비회원" : userName}
        </Typography>
        <TextField
          multiline
          rows={3}
          size="small"
          variant="outlined"
          fullWidth
          value={inputComment}
          onTouchStart={disableEnterTriggerOnMobile}
          onChange={handleCommentInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1 }}>
        <Button variant="contained" onClick={handleButtonClick}>
          작성하기
        </Button>
      </Box>
    </>
  );
};

export default CommentInput;
