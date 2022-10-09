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
  chatRoomId?: string;
}

export const LiveChatInput = ({
  sendChat,
  setIsSendChat,
  chatRoomId,
}: LiveChatInputProps): JSX.Element => {
  const { id, userName } = useContext(RootContext);

  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(event.target.value);
  };

  const sendChatByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!chatRoomId) return;
    if (id === undefined || userName === undefined) return;
    if (event.key === "Enter") {
      const time = new Date();
      const chat: ChatElement = {
        uid: id,
        createdAt: time,
        text: nowMessage,
        nickName: userName,
        roomId: chatRoomId,
      };

      sendChat(chat);
      setNowMessage("");
      setIsSendChat(true);
    }
  };

  const sendChatByClick = () => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (!chatRoomId) return;
    if (id === undefined || userName === undefined) return;

    const time = new Date();
    const chat: ChatElement = {
      uid: id,
      createdAt: time,
      text: nowMessage,
      nickName: userName,
      roomId: chatRoomId,
    };

    sendChat(chat);
    setNowMessage("");
    setIsSendChat(true);
  };

  return (
    <OutlinedInput
      disabled={id === undefined}
      placeholder={id === undefined ? "로그인 후 사용해주세요" : ""}
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

export default LiveChatInput;
