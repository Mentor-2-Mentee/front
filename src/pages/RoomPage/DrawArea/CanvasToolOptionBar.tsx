import { styled } from "@mui/system";
import CreateIcon from "@mui/icons-material/Create";
import EraserIcon from "../../../assets/icons/EraserIcon";
import { Slider } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useEffect, useState } from "react";
import { CanvasToolOption } from ".";

export type Tool = "pencil" | "eraser";

export interface ToolState {
  size: number;
  color: string;
}

const TOOL_SIZE_OPTION = {
  MIN: 10,
  MAX: 50,
  STEP: 10,
};

interface CanvasOptionBarProps {
  setCanvasToolOption: React.Dispatch<React.SetStateAction<CanvasToolOption>>;
}

export const CanvasToolOptionBar = ({
  setCanvasToolOption,
}: CanvasOptionBarProps): JSX.Element => {
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const [pencilState, setPencilState] = useState<ToolState>({
    size: 30,
    color: "black",
  });
  const [eraserState, setEraserState] = useState<ToolState>({
    size: 30,
    color: "white",
  });

  const selectedIconBackGround = (toolName: string): string => {
    if (toolName === selectedTool) return SignatureColor.YELLOW;
    return "none";
  };

  const selectedToolSize = (): number => {
    switch (selectedTool) {
      case "pencil":
        return pencilState.size;

      case "eraser":
        return eraserState.size;

      default:
        return pencilState.size;
    }
  };

  const selectedToolColor = (): string => {
    switch (selectedTool) {
      case "pencil":
        return pencilState.color;

      case "eraser":
        return eraserState.color;

      default:
        return pencilState.color;
    }
  };

  const handleSizeSlider = (_: Event, value: number | number[]) => {
    if (typeof value === "object") return;
    switch (selectedTool) {
      case "pencil":
        return setPencilState({
          ...pencilState,
          size: value,
        });

      case "eraser":
        return setEraserState({
          ...eraserState,
          size: value * 1.5, // 지우개는 팬의 1.5배
        });

      default:
        return setPencilState({
          ...pencilState,
          size: value,
        });
    }
  };

  useEffect(() => {
    setCanvasToolOption({
      selectedTool,
      size: selectedToolSize(),
      color: selectedToolColor(),
    });
  }, [selectedTool, pencilState, eraserState]);

  return (
    <CanvasOptionContainer>
      <IconWrapper>
        <CreateIcon
          sx={{ background: selectedIconBackGround("pencil") }}
          onClick={() => {
            setSelectedTool("pencil");
          }}
        />
        <EraserIcon
          sx={{ background: selectedIconBackGround("eraser") }}
          onClick={() => {
            setSelectedTool("eraser");
          }}
        />
      </IconWrapper>
      <Slider
        value={selectedToolSize()}
        onChange={handleSizeSlider}
        step={TOOL_SIZE_OPTION.STEP}
        marks
        min={TOOL_SIZE_OPTION.MIN}
        max={TOOL_SIZE_OPTION.MAX}
        sx={(theme) => ({
          width: theme.spacing(20),
        })}
      />
    </CanvasOptionContainer>
  );
};

const CanvasOptionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  margin: theme.spacing(1, 0, 0, 0),
}));

const IconWrapper = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(2),
  marginRight: theme.spacing(2),
  borderRight: "2px solid black",
  "& > *": {
    padding: theme.spacing(0, 1, 0, 1),
  },
}));

export default CanvasToolOptionBar;
