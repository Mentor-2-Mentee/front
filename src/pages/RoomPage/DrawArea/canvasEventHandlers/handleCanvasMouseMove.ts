import { CanvasEventHandlerParams, CanvasMouseEventHandler } from ".";

export const handleCanvasMouseMove = ({
  canvasRef,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
}: CanvasEventHandlerParams): CanvasMouseEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;
  const [nowStroke, setNowStroke] = useNowStrokeState;

  return (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
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

    setInputType("mouse");

    const lineWidth = Math.log(pressure + 1) * 40;

    setNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
