import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
  SxProps,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { usePostImageMutation } from "../../hooks/queries/images/usePostImageMutation";
import { getCookieValue } from "../../utils";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface ChatInputProps {
  userId?: string;
  roomId?: number | string;
  sendChat: (text: string, imageUrlList?: string[]) => void;
}

export const ChatInput = ({ userId, roomId, sendChat }: ChatInputProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );
  const isOpen = Boolean(anchorElement);
  const [inputText, setInputText] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const postImageMutation = usePostImageMutation(setImageUrlList);

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const sendChatByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputText && imageUrlList.length === 0) return;
    if (isComposing) return;
    if (!roomId) return;
    if (!userId) return;
    if (event.key === "Enter") {
      sendChat(inputText, imageUrlList);
      setInputText("");
      setImageUrlList([]);
    }
  };

  const sendChatByClick = () => {
    if (!inputText && imageUrlList.length === 0) return;
    if (isComposing) return;
    if (!roomId) return;
    if (!userId) return;
    sendChat(inputText, imageUrlList);
    setInputText("");
    setImageUrlList([]);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePopoverClose();
    if (event.target.files === null || event.target.files.length === 0) return;
    const imageFileList = event.target.files;
    postImageCallBack(imageFileList);
  };

  const postImageCallBack = useCallback(
    (imageFileList: FileList) => {
      postImageMutation.mutate({
        token: getCookieValue("accessToken"),
        imageFileList,
      });
    },
    [postImageMutation]
  );

  const deleteUploadedImage = useCallback(
    (deleteImageUrl: string) => () => {
      const newImageUrlList = imageUrlList.filter(
        (imageUrl) => imageUrl !== deleteImageUrl
      );
      setImageUrlList(newImageUrlList);
    },
    [imageUrlList]
  );

  return (
    <Box sx={{ maxWidth: "100%", p: 0.75 }}>
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
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <IconButton onClick={handlePopoverOpen}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={sendChatByClick}
              edge="end"
              disabled={
                inputText.trim().length === 0 && imageUrlList.length === 0
              }
              sx={{ color: SignatureColor.BLUE }}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <Popover
        open={isOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <input
          accept="image/*"
          name="chatImageUpload"
          id="chatImageUpload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        <Button
          variant="text"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageIcon />
          <label htmlFor="chatImageUpload">이미지 선택</label>
        </Button>
      </Popover>
      <Box
        sx={{
          mt: 0.5,
          display: "flex",
          overflow: "scroll",
          backgroundColor: SignatureColor.WHITE,
        }}
      >
        {imageUrlList
          ? imageUrlList.map((imageUrl) => (
              <Box sx={{ mr: 1, position: "relative" }}>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                  onClick={deleteUploadedImage(imageUrl)}
                >
                  <RemoveCircleIcon sx={{ color: SignatureColor.RED }} />
                </IconButton>
                <img src={imageUrl} width={100} height={100} />
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
};

const ChatInputSxProps: SxProps = {
  background: "white",
  border: "none",
  minHeight: "2rem",
};
