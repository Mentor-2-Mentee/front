import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchMove = ({
  canvasRef,
  canvasToolOption,
  dispatchInputType,
  isDrawing,
  nowStroke,
  dispatchNowStroke,
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  return (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    dispatchInputType("touch");
    let pressure = 1.0;

    pressure = event.nativeEvent.touches[0]["force"];
    if (pressure > 1.0) dispatchInputType("pencil");
    let x =
      (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
      (window.devicePixelRatio ?? 1);
    let y =
      (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
      (window.devicePixelRatio ?? 1);

    let lineWidth;
    if (nowStroke.length === 0) {
      lineWidth = Math.log(pressure + 1) * canvasToolOption.size;
    } else {
      lineWidth =
        Math.log(pressure + 1) * canvasToolOption.size * 0.3 +
        nowStroke[nowStroke.length - 1].lineWidth * 0.7;
    }

    dispatchNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
