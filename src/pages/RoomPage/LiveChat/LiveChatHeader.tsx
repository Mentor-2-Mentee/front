import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  HandlerButtonColor,
  SignatureColor,
} from "../../../commonStyles/CommonColor";
import { useState } from "react";

export const LiveChatHeader = (): JSX.Element => {
  return (
    <LiveChatHeaderContainer>
      <ChatHandler />
    </LiveChatHeaderContainer>
  );
};

const ChatHandler = (): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const visibleButtonIcon = () => {
    setIsHover(true);
  };
  const invisibleButtonIcon = () => {
    setIsHover(false);
  };
  return (
    <>
      <ChatHandlerContainer
        onMouseOver={visibleButtonIcon}
        onMouseOut={invisibleButtonIcon}
      >
        <ChatHandlerButton
          sx={{
            background: HandlerButtonColor.CLEAR,
          }}
        >
          <ClearIcon
            fontSize="inherit"
            sx={{
              display: isHover ? "inherit" : "none",
            }}
          />
        </ChatHandlerButton>
        <ChatHandlerButton
          sx={{
            background: HandlerButtonColor.MINIMIZE,
          }}
        >
          <RemoveIcon
            fontSize="inherit"
            sx={{
              display: isHover ? "inherit" : "none",
            }}
          />
        </ChatHandlerButton>
      </ChatHandlerContainer>
    </>
  );
};

const ChatHandlerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: theme.spacing(6),
  justifyContent: "space-around",
  marginLeft: theme.spacing(1),
}));

const ChatHandlerButton = styled("div")(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  borderRadius: theme.spacing(1),
  color: SignatureColor.BLACK,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LiveChatHeaderContainer = styled("div")(({ theme }) => ({
  backgroundColor: SignatureColor.BLACK_80,
  color: SignatureColor.WHITE,
  display: "flex",
  alignItems: "center",
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
}));

export default LiveChatHeader;
