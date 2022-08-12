import { Stroke } from "./Canvas";
import { CanvasToolOption } from ".";
import { EffectCallback } from "react";

interface DrawOnCanvasInitParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasToolOption: CanvasToolOption;
}

const QUAD_RATIC_CURVE_RATIO = 2;
export const drawOnCanvasInit = ({
  canvasRef,
  canvasToolOption,
}: DrawOnCanvasInitParams) => {
  return (stroke: Stroke) => {
    if (stroke.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.strokeStyle = canvasToolOption.color;
    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";

    const lineIndex = stroke.length - 1;
    if (stroke.length >= 3) {
      const xc =
        (stroke[lineIndex].x + stroke[lineIndex - 1].x) /
        QUAD_RATIC_CURVE_RATIO;
      const yc =
        (stroke[lineIndex].y + stroke[lineIndex - 1].y) /
        QUAD_RATIC_CURVE_RATIO;
      canvasContext.lineWidth = stroke[lineIndex - 1].lineWidth;
      canvasContext.quadraticCurveTo(
        stroke[lineIndex - 1].x,
        stroke[lineIndex - 1].y,
        xc,
        yc
      );
      canvasContext.stroke();
      canvasContext.beginPath();
      canvasContext.moveTo(xc, yc);
    } else {
      const point = stroke[lineIndex];
      canvasContext.lineWidth = point.lineWidth;
      canvasContext.beginPath();
      canvasContext.moveTo(point.x, point.y);
      canvasContext.stroke();
    }
  };
};
