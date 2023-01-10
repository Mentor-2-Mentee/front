import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchStart = ({
  canvasRef,
  canvasToolOption,
  dispatchInputType,
  dispatchIsDrawing,
  nowStroke,
  dispatchNowStroke,
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  return (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;
    let x;
    let y;

    dispatchInputType("touch");
    pressure = event.nativeEvent.touches[0]["force"];
    if (pressure > 1.0) dispatchInputType("pencil");
    x =
      (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
      (window.devicePixelRatio ?? 1);
    y =
      (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
      (window.devicePixelRatio ?? 1);

    dispatchIsDrawing(true);
    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    canvasContext.lineWidth = lineWidth;

    dispatchNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
