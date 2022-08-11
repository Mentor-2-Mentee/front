import { styled } from "@mui/system";
import { useEffect, useRef } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import AreaHeader from "../AreaHeader";
import Canvas from "./Canvas";
import CanvasOptionBar from "./CanvasOptionBar";

export const DrawArea = (): JSX.Element => {
  return (
    <DrawAreaContainer>
      <AreaHeader />
      <CanvasOptionBar />
      <Canvas />
    </DrawAreaContainer>
  );
};

const DrawAreaContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "flex",
  flexFlow: "column",
  backgroundColor: SignatureColor.GRAY_BORDER,
  width: `calc(100vw - ${theme.spacing(40)})`,
  borderRadius: theme.spacing(1),
}));

export default DrawArea;
