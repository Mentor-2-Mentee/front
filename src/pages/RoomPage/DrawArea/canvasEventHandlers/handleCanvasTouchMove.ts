import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchMove = ({
  canvasRef,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;

  return (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    setInputType("touch");
    let pressure = 1.0;
    let x = 0;
    let y = 0;
    if (event.nativeEvent.touches[0]["force"] > 0) {
      pressure = event.nativeEvent.touches[0]["force"];
      setInputType("pencil");
      x =
        (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
        (window.devicePixelRatio ?? 1);
      y =
        (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
        (window.devicePixelRatio ?? 1);
    }

    // const lineWidth =
    //   Math.log(pressure + 1) * 40 * 0.2 +
    //   contectPoints[contectPoints.length - 1].lineWidth * 0.8;

    // canvasContext.lineWidth = lineWidth;

    // setContentPoints([...contectPoints, { x, y, lineWidth }]);
    // drawOnCanvas(contectPoints);
  };
};
