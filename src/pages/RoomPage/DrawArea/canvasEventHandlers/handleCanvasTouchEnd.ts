import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchEnd = ({
  canvasRef,
  canvasToolOption,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
  useStrokeHistoryState,
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;
  const [nowStroke, setNowStroke] = useNowStrokeState;
  const [strokeHistory, setStrokeHistory] = useStrokeHistoryState;

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
    let x = 0;
    let y = 0;

    setInputType("touch");
    if (
      event.nativeEvent.touches.length !== 0 &&
      event.nativeEvent.touches[0]["force"] !== undefined
    ) {
      pressure = event.nativeEvent.touches[0]["force"];
      x =
        (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
        (window.devicePixelRatio ?? 1);
      y =
        (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
        (window.devicePixelRatio ?? 1);
    }

    setIsDrawing(false);
    const lineWidth = Math.log(pressure + 1) * canvasToolOption.size;

    canvasContext.lineWidth = lineWidth;

    setStrokeHistory([...strokeHistory, nowStroke]);
    setNowStroke([]);
  };
};
