import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseDown = ({
  canvasRef,
  canvasToolOption,
  dispatchInputType,
  dispatchIsDrawing,
  nowStroke,
  dispatchNowStroke,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  return (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;
    let x =
      (event.nativeEvent.clientX - canvasPosition.x) *
        window.devicePixelRatio ?? 1;
    let y =
      (event.nativeEvent.clientY - canvasPosition.y) *
        window.devicePixelRatio ?? 1;

    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    canvasContext.lineWidth = lineWidth;
    dispatchInputType("mouse");
    dispatchIsDrawing(true);

    dispatchNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
