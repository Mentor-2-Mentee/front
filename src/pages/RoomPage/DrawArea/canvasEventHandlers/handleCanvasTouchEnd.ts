import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchEnd = ({
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
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;
    let x = 0;
    let y = 0;

    setInputType("touch");
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

    setIsDrawing(false);
    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;
  };
};
