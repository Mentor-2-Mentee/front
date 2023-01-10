import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchEnd = ({
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
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  return (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;

    dispatchInputType("touch");
    if (
      event.nativeEvent.touches.length !== 0 &&
      event.nativeEvent.touches[0]["force"] !== undefined
    ) {
      pressure = event.nativeEvent.touches[0]["force"];
    }

    dispatchIsDrawing(false);
    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    canvasContext.lineWidth = lineWidth;

    dispatchStrokeHistory([...strokeHistory, nowStroke]);
    sendCanvasStroke(nowStroke, canvasToolOption);
    dispatchNowStroke([]);
  };
};
