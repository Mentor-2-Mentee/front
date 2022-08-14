import { CanvasEventHandlerParams, CanvasTouchEventHandler } from ".";

export const handleCanvasTouchMove = ({
  canvasRef,
  canvasToolOption,
  useInputTypeState,
  useIsDrawingState,
  useNowStrokeState,
}: CanvasEventHandlerParams): CanvasTouchEventHandler => {
  const [inputType, setInputType] = useInputTypeState;
  const [isDrawing, setIsDrawing] = useIsDrawingState;
  const [nowStroke, setNowStroke] = useNowStrokeState;

  return (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    setInputType("touch");
    let pressure = 1.0;

    pressure = event.nativeEvent.touches[0]["force"];
    setInputType("pencil");
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

    setNowStroke([...nowStroke, { x, y, lineWidth }]);
  };
};
