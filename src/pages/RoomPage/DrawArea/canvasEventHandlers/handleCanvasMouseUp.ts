import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseUp = ({
  canvasRef,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
  useStrokeHistoryState,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;
  const [nowStroke, setNowStroke] = useNowStrokeState;
  const [strokeHistory, setStrokeHistory] = useStrokeHistoryState;

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
      (event.nativeEvent.clientX - canvasPosition.x) * window.devicePixelRatio;
    let y =
      (event.nativeEvent.clientY - canvasPosition.y) * window.devicePixelRatio;

    setInputType("mouse");
    setIsDrawing(false);

    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;

    setStrokeHistory([...strokeHistory, nowStroke]);
    setNowStroke([]);
  };
};