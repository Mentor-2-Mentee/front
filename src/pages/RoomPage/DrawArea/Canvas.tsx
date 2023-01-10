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
import { CanvasToolOption } from ".";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  LiveCanvasCacheDataEntitiy,
  SendCanvasStroke,
} from "../../../hooks/queries/liveCanvas";

export interface Dot {
  x: number;
  y: number;
  lineWidth: number;
}

export type Stroke = Dot[];

export enum InputType {
  mouse = "Mouse",
  touch = "👆",
  pencil = "✍️",
}

interface CanvasProps {
  canvasToolOption: CanvasToolOption;
  sendCanvasStroke: SendCanvasStroke;
}

export const Canvas = ({
  canvasToolOption,
  sendCanvasStroke,
}: CanvasProps): JSX.Element => {
  const { roomId } = useParams();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasRef({
    sizeTargetContainerRef: canvasContainerRef,
  });
  const otherUserCanvasRef = useCanvasRef({
    sizeTargetContainerRef: canvasContainerRef,
  });

  const [inputType, setInputType] = useState<keyof typeof InputType>("mouse");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [nowStroke, setNowStroke] = useState<Stroke>([]);
  const [strokeHistory, setStrokeHistory] = useState<Stroke[]>([]);

  const dispatchInputType = (nowInputType: keyof typeof InputType) =>
    setInputType(nowInputType);
  const dispatchIsDrawing = (isDrawing: boolean) => setIsDrawing(isDrawing);
  const dispatchNowStroke = (nowStroke: Stroke) => setNowStroke(nowStroke);
  const dispatchStrokeHistory = (Strokes: Stroke[]) =>
    setStrokeHistory(Strokes);

  const canvasEventHandlerConfig: CanvasEventHandlerParams = {
    canvasRef,
    canvasToolOption,
    dispatchInputType,
    isDrawing,
    dispatchIsDrawing,
    nowStroke,
    dispatchNowStroke,
    strokeHistory,
    dispatchStrokeHistory,
    sendCanvasStroke,
  };
  const preventScrollMovement = (): EffectCallback => {
    return () => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    };
  };

  const drawOnMyCanvasLayer = useCallback(drawOnCanvasInit({ canvasRef }), [
    canvasRef,
    canvasToolOption,
  ]);

  useEffect(preventScrollMovement(), []);
  useEffect(() => {
    drawOnMyCanvasLayer(nowStroke, canvasToolOption);
  }, [nowStroke]);

  const { data } = useQuery<LiveCanvasCacheDataEntitiy>(["liveCanvas", roomId]);

  const drawOnOtherCanvasLayer = useCallback(
    drawOnCanvasInit({ canvasRef: otherUserCanvasRef }),
    [otherUserCanvasRef, canvasToolOption]
  );

  useEffect(() => {
    if (!data) return;
    const latestStroke =
      data.otherUserStrokeList[data.otherUserStrokeList.length - 1].stroke;
    const latestStrokeUsedOption =
      data.otherUserStrokeList[data.otherUserStrokeList.length - 1]
        .canvasToolOption;

    const list: Stroke = [];

    latestStroke.map((ele) => {
      list.push(ele);
      drawOnOtherCanvasLayer(list, latestStrokeUsedOption);
    });
  }, [data]);

  return (
    <CanvasContainer ref={canvasContainerRef}>
      <MyCanvasLayer
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown(canvasEventHandlerConfig)}
        onMouseMove={handleCanvasMouseMove(canvasEventHandlerConfig)}
        onMouseUp={handleCanvasMouseUp(canvasEventHandlerConfig)}
        onTouchStart={handleCanvasTouchStart(canvasEventHandlerConfig)}
        onTouchMove={handleCanvasTouchMove(canvasEventHandlerConfig)}
        onTouchEnd={handleCanvasTouchEnd(canvasEventHandlerConfig)}
      />
      <OtherUserCanvasLayer ref={otherUserCanvasRef} />
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
  overflow: "hidden",
}));

const DrawInfoContainer = styled("div")(({}) => ({
  position: "absolute",
  top: 180,
  left: 40,
}));

const MyCanvasLayer = styled("canvas")(({}) => ({
  position: "relative",
  zIndex: 2,
}));

const OtherUserCanvasLayer = styled("canvas")(({}) => ({
  position: "relative",
  transform: `translate(0%, -100.5%)`,
  zIndex: 1,
}));

export default Canvas;
