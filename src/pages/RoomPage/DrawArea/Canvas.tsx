import {
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/system";
import useCanvasRef from "./useCanvasRef";
import {
  CanvasEventHandlerParams,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasTouchEnd,
  handleCanvasTouchMove,
  handleCanvasTouchStart,
} from "./canvasEventHandlers";
import { drawOnCanvasInit } from "./drawOnCanvas";

export interface ParticleStroke {
  x: number;
  y: number;
  lineWidth: number;
}

export type Stroke = ParticleStroke[];

export enum InputType {
  mouse = "Mouse",
  touch = "👆",
  pencil = "✍️",
}

export const Canvas = (): JSX.Element => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasRef({
    sizeTargetContainerRef: canvasContainerRef,
  });

  const [inputType, setInputType] = useState<keyof typeof InputType>("mouse");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeHistory, setStrokeHistory] = useState<Stroke[]>([]);

  const [nowStroke, setNowStroke] = useState<Stroke>([]);

  const canvasEventHandlerConfig: CanvasEventHandlerParams = {
    canvasRef,
    useInputTypeState: [inputType, setInputType],
    useIsDrawingState: [isDrawing, setIsDrawing],
    useNowStrokeState: [nowStroke, setNowStroke],
    useStrokeHistoryState: [strokeHistory, setStrokeHistory],
  };
  const preventScrollMovement = (): EffectCallback => {
    return () => {
      document.body.style.overflow = "hidden";
      document.body.style.userSelect = "none";
      return () => {
        document.body.style.overflow = "unset";
        document.body.style.userSelect = "";
      };
    };
  };

  const drawOnCanvas = useCallback(drawOnCanvasInit({ canvasRef }), [
    canvasRef,
  ]);

  useEffect(preventScrollMovement(), []);
  useEffect(() => {
    console.log(nowStroke);
    drawOnCanvas(nowStroke);
  }, [nowStroke]);

  return (
    <CanvasContainer ref={canvasContainerRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown(canvasEventHandlerConfig)}
        onMouseMove={handleCanvasMouseMove(canvasEventHandlerConfig)}
        onMouseUp={handleCanvasMouseUp(canvasEventHandlerConfig)}
        onTouchStart={handleCanvasTouchStart(canvasEventHandlerConfig)}
        onTouchMove={handleCanvasTouchMove(canvasEventHandlerConfig)}
        onTouchEnd={handleCanvasTouchEnd(canvasEventHandlerConfig)}
      />
      <DrawInfoContainer>
        <div>{`현재사용타입: ${InputType[inputType]}`}</div>
        <button
          onClick={() => {
            console.log(strokeHistory);
          }}
        >
          켄버스 로그 확인
        </button>
      </DrawInfoContainer>
    </CanvasContainer>
  );
};

const CanvasContainer = styled("div")(({ theme }) => ({
  height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(22.5)})`,
  background: "white",
  margin: theme.spacing(1),
}));

const DrawInfoContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 150,
  left: 40,
}));

export default Canvas;
