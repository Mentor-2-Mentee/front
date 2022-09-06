import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { RootContext } from "../../../hooks/context/RootContext";
import { useParams } from "react-router-dom";
import { ChatElement } from "./LiveChatElement";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface LiveChatInputProps {
  sendChat: (socketQueryData: ChatElement) => void;
  setIsSendChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LiveChatInput = ({
  sendChat,
  setIsSendChat,
}: LiveChatInputProps): JSX.Element => {
  const { roomId } = useParams();
  const { userId, username } = useContext(RootContext);

  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(event.target.value);
  };

  const sendChatByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!roomId) return;
    if (userId === undefined || username === undefined) return;
    if (event.key === "Enter") {
      const time = new Date();
      const chat: ChatElement = {
        uid: userId,
        createdAt: time,
        text: nowMessage,
        nickName: username,
        roomId: roomId,
      };

      sendChat(chat);
      setNowMessage("");
      setIsSendChat(true);
    }
  };

  const sendChatByClick = () => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!roomId) return;
    if (userId === undefined || username === undefined) return;

    const time = new Date();
    const chat: ChatElement = {
      uid: userId,
      createdAt: time,
      text: nowMessage,
      nickName: username,
      roomId: roomId,
    };

    sendChat(chat);
    setNowMessage("");
    setIsSendChat(true);
  };

  return (
    <OutlinedInput
      disabled={userId === undefined}
      placeholder={userId === undefined ? "로그인 후 사용해주세요" : ""}
      type="text"
      value={nowMessage}
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
      sx={(theme) => ({
        background: "white",
        margin: theme.spacing(1),
        border: "none",
        minHeight: theme.spacing(3),
      })}
    />
  );
};

const LiveChatInputTag = styled("input")(({ theme }) => ({
  margin: theme.spacing(1),
  border: "none",
  minHeight: theme.spacing(3),
}));

export default LiveChatInput;
