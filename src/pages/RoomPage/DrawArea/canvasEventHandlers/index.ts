import { InputType, Stroke } from "../Canvas";

export * from "./handleCanvasMouseDown";
export * from "./handleCanvasMouseMove";
export * from "./handleCanvasMouseUp";

export * from "./handleCanvasTouchStart";
export * from "./handleCanvasTouchMove";
export * from "./handleCanvasTouchEnd";

export interface CanvasEventHandlerParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  useInputTypeState: [
    keyof typeof InputType,
    React.Dispatch<React.SetStateAction<keyof typeof InputType>>
  ];
  useIsDrawingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  useNowStrokeState: [Stroke, React.Dispatch<React.SetStateAction<Stroke>>];
  useStrokeHistoryState: [
    Stroke[],
    React.Dispatch<React.SetStateAction<Stroke[]>>
  ];
}

export type CanvasMouseEventHandler =
  React.MouseEventHandler<HTMLCanvasElement>;
export type CanvasTouchEventHandler =
  React.TouchEventHandler<HTMLCanvasElement>;
