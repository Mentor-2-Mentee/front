import { Stroke } from "./Canvas";
import { CanvasToolOption } from ".";

interface DrawOnCanvasInitParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const QUAD_RATIC_CURVE_RATIO = 2;

export const drawOnCanvasInit = ({ canvasRef }: DrawOnCanvasInitParams) => {
  return (stroke: Stroke, canvasToolOption: CanvasToolOption) => {
    if (stroke.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.strokeStyle = canvasToolOption.color;
    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";

    if (canvasToolOption.selectedTool === "pencil") {
      canvasContext.globalCompositeOperation = "source-over";
    }
    if (canvasToolOption.selectedTool === "eraser") {
      canvasContext.globalCompositeOperation = "destination-out";
    }

    console.log("draw stroke", stroke, canvasToolOption);
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
      const dot = stroke[lineIndex];
      canvasContext.lineWidth = dot.lineWidth;
      canvasContext.beginPath();
      canvasContext.moveTo(dot.x, dot.y);
      canvasContext.stroke();
    }
  };
};
