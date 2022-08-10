import { Stroke } from "./Canvas";

interface DrawOnCanvasInitParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const QUAD_RATIC_CURVE_RATIO = 2;
export const drawOnCanvasInit = ({ canvasRef }: DrawOnCanvasInitParams) => {
  return (stroke: Stroke) => {
    if (stroke.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.strokeStyle = "black";
    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";

    const l = stroke.length - 1;
    if (stroke.length >= 3) {
      const xc = (stroke[l].x + stroke[l - 1].x) / QUAD_RATIC_CURVE_RATIO;
      const yc = (stroke[l].y + stroke[l - 1].y) / QUAD_RATIC_CURVE_RATIO;
      canvasContext.lineWidth = stroke[l - 1].lineWidth;
      canvasContext.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc);
      canvasContext.stroke();
      canvasContext.beginPath();
      canvasContext.moveTo(xc, yc);
    } else {
      const point = stroke[l];
      console.log(stroke, l, point);
      canvasContext.lineWidth = point.lineWidth;
      // canvasContext.strokeStyle = point.color
      canvasContext.beginPath();
      canvasContext.moveTo(point.x, point.y);
      canvasContext.stroke();
    }
  };
};
