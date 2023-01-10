import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseMove = ({
  canvasRef,
  canvasToolOption,
  dispatchInputType,
  isDrawing,
  nowStroke,
  dispatchNowStroke,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  return (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    let pressure = 1.0;
    let x =
      (event.nativeEvent.clientX - canvasPosition.x) *
        window.devicePixelRatio ?? 1;
    let y =
      (event.nativeEvent.clientY - canvasPosition.y) *
        window.devicePixelRatio ?? 1;

    dispatchInputType("mouse");

    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    dispatchNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
