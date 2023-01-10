import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CommentInputProps {
  userName?: string;
  submitCallback: (inputComment: string) => void;
  publicable?: boolean;
}

export const CommentInput = ({
  userName,
  submitCallback,
}: // publicable = true,
CommentInputProps) => {
  const [inputComment, setInputComment] = useState<string>("");
  const [holdShift, setHoldShift] = useState<boolean>(false);
  const [disableEnterSubmit, setDisableEnterSubmit] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPassword, setGuestPassword] = useState<string>("");

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
  const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGuestName(event.target.value);
  const handleGuestPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setGuestPassword(event.target.value);

  return (
    <>
      <Box sx={{ pt: 1 }}>
        {userName === undefined ? (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              variant="outlined"
              name="title"
              size="small"
              label="닉네임"
              error={guestName.length > 10}
              helperText={
                guestName.length > 10 ? "닉네임은 10자 이하만 가능" : ""
              }
              disabled={Boolean(userName)}
              sx={{ mr: 1 }}
              value={userName ? userName : guestName}
              onChange={handleGuestNameChange}
            />

            <TextField
              variant="outlined"
              name="title"
              size="small"
              label="비밀번호"
              type={"password"}
              error={guestPassword.length > 36}
              helperText={
                guestPassword.length > 10 ? "비밀번호는 36자 이하만 가능" : ""
              }
              value={guestPassword}
              onChange={handleGuestPasswordChange}
              sx={{ mr: 2 }}
            />
          </Box>
        ) : (
          <Typography variant="subtitle1" fontWeight={"bold"} mb={0.5}>
            {userName}
          </Typography>
        )}

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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button variant="contained" onClick={handleButtonClick}>
          작성하기
        </Button>
      </Box>
    </>
  );
};

export default CommentInput;
