import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseDown = ({
  canvasRef,
  canvasToolOption,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;
  const [nowStroke, setNowStroke] = useNowStrokeState;

  return (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
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
    setInputType("mouse");
    setIsDrawing(true);

    setNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
