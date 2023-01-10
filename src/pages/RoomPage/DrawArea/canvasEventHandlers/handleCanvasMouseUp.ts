import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseUp = ({
  canvasRef,
  canvasToolOption,
  dispatchInputType,
  isDrawing,
  dispatchIsDrawing,
  nowStroke,
  dispatchNowStroke,
  strokeHistory,
  dispatchStrokeHistory,
  sendCanvasStroke,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  return () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;
    let pressure = 1.0;

    dispatchInputType("mouse");
    dispatchIsDrawing(false);

    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    canvasContext.lineWidth = lineWidth;

    dispatchStrokeHistory([...strokeHistory, nowStroke]);
    sendCanvasStroke(nowStroke, canvasToolOption);
    dispatchNowStroke([]);
  };
};
