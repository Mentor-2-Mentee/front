import { useRef, useState } from "react";
import { styled } from "@mui/system";
import useCanvasRef from "./useCanvasRef";

interface Coordinates {
  x: number;
  y: number;
}

interface ContectPoint extends Coordinates {
  pressure: number;
}

enum UseType {
  mouse = "Mouse",
  touch = "👆",
  pencil = "✍️",
}

export const Canvas = (): JSX.Element => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasRef({ targetContainerRef: canvasContainerRef });

  const [useType, setUseType] = useState<keyof typeof UseType>("mouse");

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [lineWidth, setLineWidth] = useState<number>(0);
  const [contectPoints, setContentPoints] = useState<ContectPoint[]>([]);

  const drawStart = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    let pressure = 0.1;
    let x = 0;
    let y = 0;
    if (
      event.nativeEvent instanceof TouchEvent &&
      event.nativeEvent.touches &&
      event.nativeEvent.touches[0] &&
      event.nativeEvent.touches[0]["force"] !== undefined
    ) {
      setUseType("touch");
      if (event.nativeEvent.touches[0]["force"] > 0) {
        pressure = event.nativeEvent.touches[0]["force"];
        setUseType("pencil");
        x = event.nativeEvent.touches[0].pageX * window.devicePixelRatio ?? 1;
        y = event.nativeEvent.touches[0].pageY * window.devicePixelRatio ?? 1;
      }
    } else if (event.nativeEvent instanceof MouseEvent) {
      setUseType("mouse");
      pressure = 1.0;
      x = event.nativeEvent.pageX * window.devicePixelRatio ?? 1;
      y = event.nativeEvent.pageY * window.devicePixelRatio ?? 1;
    }

    setIsMouseDown(true);

    setContentPoints([...contectPoints, { x, y, pressure }]);
  };

  const drawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isMouseDown) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.strokeStyle = "black";
    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";
  };

  const drowEnd = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsMouseDown(false);
  };

  return (
    <CanvasContainer ref={canvasContainerRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={drawStart}
        onTouchStart={drawStart}
        onMouseMove={drawing}
        onTouchMove={drawing}
        onMouseUp={drowEnd}
        onTouchEnd={drowEnd}
      />
      <div>{`현재사용타입: ${useType}`}</div>
      <div>{`pressure: ${
        contectPoints.length === 0 ? 0 : contectPoints[0].pressure
      }`}</div>
    </CanvasContainer>
  );
};

const CanvasContainer = styled("div")(({ theme }) => ({
  height: `calc(100vh - ${theme.spacing(20)})`,
  background: "white",
  margin: theme.spacing(1),
}));

export default Canvas;
