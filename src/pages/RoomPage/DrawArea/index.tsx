import { Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useCanvasSocketQuery } from "../../../hooks/queries/liveCanvas";
import AreaHeader from "../AreaHeader";
import Canvas from "./Canvas";
import CanvasToolOptionBar, { Tool, ToolState } from "./CanvasToolOptionBar";

export interface CanvasToolOption extends ToolState {
  selectedTool: Tool;
}

export const DrawArea = (): JSX.Element => {
  const { roomId } = useParams();
  const { id } = useContext(RootContext);
  const [canvasToolOption, setCanvasToolOption] = useState<CanvasToolOption>({
    selectedTool: "pencil",
    size: 30,
    color: "black",
  });

  const { sendCanvasStroke } = useCanvasSocketQuery({
    roomId,
    id,
  });

  const isWidthShort = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexFlow: "column",
        backgroundColor: SignatureColor.GRAY_BORDER,
        // width: `calc(100vw - ${theme.spacing(40)})`,
        height: isWidthShort ? `calc((var(--vh, 1vh) * 50))` : "auto",
        borderRadius: theme.spacing(1),
      })}
    >
      <AreaHeader />
      <CanvasToolOptionBar setCanvasToolOption={setCanvasToolOption} />
      <Canvas
        canvasToolOption={canvasToolOption}
        sendCanvasStroke={sendCanvasStroke}
      />
    </Box>
  );
};

export default DrawArea;
