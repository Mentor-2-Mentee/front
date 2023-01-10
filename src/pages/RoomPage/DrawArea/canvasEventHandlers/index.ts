import { CanvasToolOption } from "..";
import { InputType, Stroke } from "../Canvas";
import { SendCanvasStroke } from "../../../../hooks/queries/liveCanvas";

export * from "./handleCanvasMouseDown";
export * from "./handleCanvasMouseMove";
export * from "./handleCanvasMouseUp";

export * from "./handleCanvasTouchStart";
export * from "./handleCanvasTouchMove";
export * from "./handleCanvasTouchEnd";

export interface CanvasEventHandlerParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasToolOption: CanvasToolOption;
  dispatchInputType: (nowInputType: keyof typeof InputType) => void;
  isDrawing: boolean;
  dispatchIsDrawing: (isDrawing: boolean) => void;
  nowStroke: Stroke;
  dispatchNowStroke: (nowStroke: Stroke) => void;
  strokeHistory: Stroke[];
  dispatchStrokeHistory: (Strokes: Stroke[]) => void;

  sendCanvasStroke: SendCanvasStroke;
}

export type CanvasMouseEventHandler =
  React.MouseEventHandler<HTMLCanvasElement>;
export type CanvasTouchEventHandler =
  React.TouchEventHandler<HTMLCanvasElement>;
