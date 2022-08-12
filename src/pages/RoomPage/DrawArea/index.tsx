import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import AreaHeader from "../AreaHeader";
import Canvas from "./Canvas";
import CanvasToolOptionBar, { Tool, ToolState } from "./CanvasToolOptionBar";

export interface CanvasToolOption extends ToolState {
  selectedTool: Tool;
}

export const DrawArea = (): JSX.Element => {
  const [canvasToolOption, setCanvasToolOption] = useState<CanvasToolOption>({
    selectedTool: "pencil",
    size: 30,
    color: "black",
  });

  return (
    <DrawAreaContainer>
      <AreaHeader />
      <CanvasToolOptionBar setCanvasToolOption={setCanvasToolOption} />
      <Canvas canvasToolOption={canvasToolOption} />
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
