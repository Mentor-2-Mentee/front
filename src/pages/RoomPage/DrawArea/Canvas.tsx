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
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useContext } from "react";
import { RootContext } from "../../../hooks/context/RootContext";
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
  const { userId } = useContext(RootContext);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasRef({
    sizeTargetContainerRef: canvasContainerRef,
  });
  const otherUserCanvasRef = useCanvasRef({
    sizeTargetContainerRef: canvasContainerRef,
  });

  const [inputType, setInputType] = useState<keyof typeof InputType>("mouse");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeHistory, setStrokeHistory] = useState<Stroke[]>([]);

  const [nowStroke, setNowStroke] = useState<Stroke>([]);

  const canvasEventHandlerConfig: CanvasEventHandlerParams = {
    canvasRef,
    canvasToolOption,
    useInputTypeState: [inputType, setInputType],
    useIsDrawingState: [isDrawing, setIsDrawing],
    useNowStrokeState: [nowStroke, setNowStroke],
    useStrokeHistoryState: [strokeHistory, setStrokeHistory],
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
    console.log("drawOnMyCanvasLayer");
    drawOnMyCanvasLayer(nowStroke, canvasToolOption);
  }, [nowStroke]);

  const { data, status } = useQuery<LiveCanvasCacheDataEntitiy>([
    "liveCanvas",
    roomId,
  ]);

  const drawOnOtherCanvasLayer = useCallback(
    drawOnCanvasInit({ canvasRef: otherUserCanvasRef }),
    [otherUserCanvasRef, canvasToolOption]
  );

  // const [otherStroke, setOtherStroke] = useState<Stroke>([]);
  // const [otherStrokeUsedOption, setOtherStrokeUsedOption] =
  //   useState<CanvasToolOption>();

  useEffect(() => {
    if (!data) return;
    console.log("draw data", data.otherUserStrokeList);
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

const DrawInfoContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 180,
  left: 40,
}));

const MyCanvasLayer = styled("canvas")(({ theme }) => ({
  position: "relative",
  zIndex: 2,
}));

const OtherUserCanvasLayer = styled("canvas")(({ theme }) => ({
  position: "relative",
  transform: `translate(0%, -100.5%)`,
  zIndex: 1,
}));

export default Canvas;
