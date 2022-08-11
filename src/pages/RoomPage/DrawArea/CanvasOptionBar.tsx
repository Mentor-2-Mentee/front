import { styled } from "@mui/system";

import CreateIcon from "@mui/icons-material/Create";
import Eraser from "../../../assets/icons/eraser.svg";
import { Icon, IconProps, Slider, SvgIcon, SvgIconProps } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useEffect, useState } from "react";
import React from "react";

const EraserIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M898.56 432.64c10.24-10.24 10.24-25.6 0-35.84l-238.08-230.4c-10.24-10.24-25.6-10.24-35.84 0L125.44 680.96c-10.24 10.24-10.24 25.6 0 35.84l99.84 97.28 53.76 51.2h576c15.36 0 25.6-10.24 25.6-25.6s-10.24-25.6-25.6-25.6H529.92l368.64-381.44zM179.2 698.88l248.32-258.56 202.24 194.56-171.52 179.2h-161.28L179.2 698.88z"
          fill="#000000"
        />
      </svg>
    </Icon>
  );
};

type Tool = "pencil" | "eraser";

interface PencilState {
  size: number;
  color: string;
}

interface EraserState {
  size: number;
  color: string;
}

export const CanvasOptionBar = (): JSX.Element => {
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const [pencilState, setPencilState] = useState<PencilState>({
    size: 30,
    color: "black",
  });
  const [eraserState, setEraserState] = useState<EraserState>({
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

  const handleSizeSlider = (event: Event, value: number | number[]) => {
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
          size: value,
        });

      default:
        return setPencilState({
          ...pencilState,
          size: value,
        });
    }
  };

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
        step={10}
        marks
        min={10}
        max={50}
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

export default CanvasOptionBar;
