import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  HandlerButtonColor,
  SignatureColor,
} from "../../commonStyles/CommonColor";
import { useState } from "react";

export const AreaHeader = (): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const visibleButtonIcon = () => {
    setIsHover(true);
  };
  const invisibleButtonIcon = () => {
    setIsHover(false);
  };
  return (
    <AreaHeaderContainer
      onMouseOver={visibleButtonIcon}
      onMouseOut={invisibleButtonIcon}
    >
      <HandleButtonElement
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
      </HandleButtonElement>
      <HandleButtonElement
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
      </HandleButtonElement>
    </AreaHeaderContainer>
  );
};

const HandleButtonElement = styled("div")(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  borderRadius: theme.spacing(1),
  color: SignatureColor.BLACK,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const AreaHeaderContainer = styled("div")(({ theme }) => ({
  backgroundColor: SignatureColor.BLACK_80,
  color: SignatureColor.WHITE,
  display: "flex",
  alignItems: "center",
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  "& > *": {
    marginLeft: theme.spacing(1),
  },
  minHeight: theme.spacing(4),
}));

export default AreaHeader;
