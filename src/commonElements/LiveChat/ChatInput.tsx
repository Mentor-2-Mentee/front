import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  SxProps,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  userId?: string;
  roomId?: number | string;
  sendChat: (text: string, imageUrl?: string) => void;
}

export const ChatInput = ({ userId, roomId, sendChat }: ChatInputProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const sendChatByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputText) return;
    if (isComposing) return;
    if (!roomId) return;
    if (!userId) return;
    if (event.key === "Enter") {
      sendChat(inputText);
      setInputText("");
    }
  };

  const sendChatByClick = () => {
    if (!inputText) return;
    if (isComposing) return;
    if (!roomId) return;
    if (!userId) return;
    sendChat(inputText);
    setInputText("");
  };

  return (
    <OutlinedInput
      sx={ChatInputSxProps}
      disabled={!userId}
      placeholder={userId ? undefined : "로그인 후 사용해주세요"}
      type="text"
      value={inputText}
      onChange={handleChatInput}
      onKeyDownCapture={sendChatByEnter}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      size="small"
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={sendChatByClick} edge="end">
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

const ChatInputSxProps: SxProps = {
  background: "white",
  m: 0.75,
  border: "none",
  minHeight: "3rem",
};
