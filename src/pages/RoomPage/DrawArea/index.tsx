import { styled } from "@mui/system";
import { useEffect, useRef } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import AreaHeader from "../AreaHeader";
import Canvas from "./Canvas";
import CanvasOption from "./CanvasOption";

export const DrawArea = (): JSX.Element => {
  return (
    <DrawAreaContainer>
      <AreaHeader />
      <CanvasOption />
      <Canvas />
    </DrawAreaContainer>
  );
};

const DrawAreaContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "flex",
  flexFlow: "column",
  backgroundColor: SignatureColor.GRAY_BORDER,
  width: `calc(100% - ${theme.spacing(40)})`,
  minHeight: `calc(100vh - ${theme.spacing(10.5)})`,

  borderRadius: theme.spacing(1),
  height: "auto",
}));

export default DrawArea;
