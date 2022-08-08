import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import useCanvasRef from "./useCanvasRef";

interface Coordinates {
  x: number;
  y: number;
}

interface ContectPoint extends Coordinates {
  lineWidth: number;
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

  const [contectPoints, setContentPoints] = useState<ContectPoint[]>([]);
  const [strokeHistory, setStrokeHistory] = useState([]);

  const drawOnCanvas = (stroke: ContectPoint[]) => {
    if (stroke.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    canvasContext.strokeStyle = "black";
    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";

    // console.log("stroke", stroke);
    const l = stroke.length - 1;
    if (stroke.length >= 3) {
      const xc =
        (stroke[l].x + stroke[l - 1].x) / (window.devicePixelRatio ?? 1);
      const yc =
        (stroke[l].y + stroke[l - 1].y) / (window.devicePixelRatio ?? 1);
      canvasContext.lineWidth = stroke[l - 1].lineWidth;
      canvasContext.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc);
      canvasContext.stroke();
      canvasContext.beginPath();
      canvasContext.moveTo(xc, yc);
    } else {
      const point = stroke[l];
      canvasContext.lineWidth = point.lineWidth;
      // canvasContext.strokeStyle = point.color
      canvasContext.beginPath();
      canvasContext.moveTo(point.x, point.y);
      canvasContext.stroke();
    }

    // setContentPoints([]);
  };

  const drawStart = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

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
        x =
          (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
          (window.devicePixelRatio ?? 1);
        y =
          (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
          (window.devicePixelRatio ?? 1);
      }
    } else if (event.nativeEvent instanceof MouseEvent) {
      setUseType("mouse");
      pressure = 1.0;
      x =
        (event.nativeEvent.clientX - canvasPosition.x) *
          window.devicePixelRatio ?? 1;
      y =
        (event.nativeEvent.clientY - canvasPosition.y) *
          window.devicePixelRatio ?? 1;
    }

    setIsMouseDown(true);

    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;

    setContentPoints([...contectPoints, { x, y, lineWidth }]);
    drawOnCanvas(contectPoints);
  };

  const handleMove = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isMouseDown) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

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
        x =
          (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
          (window.devicePixelRatio ?? 1);
        y =
          (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
          (window.devicePixelRatio ?? 1);
      }
    } else if (event.nativeEvent instanceof MouseEvent) {
      setUseType("mouse");
      pressure = 1.0;
      x =
        (event.nativeEvent.clientX - canvasPosition.x) *
          window.devicePixelRatio ?? 1;
      y =
        (event.nativeEvent.clientY - canvasPosition.y) *
          window.devicePixelRatio ?? 1;
    }

    setIsMouseDown(true);

    const lineWidth =
      Math.log(pressure + 1) * 40 * 0.2 +
      contectPoints[contectPoints.length - 1].lineWidth * 0.8;

    canvasContext.lineWidth = lineWidth;

    setContentPoints([...contectPoints, { x, y, lineWidth }]);
    drawOnCanvas(contectPoints);
  };

  const drowEnd = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    if (!canvasPosition) return;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;
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
        x =
          (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
          (window.devicePixelRatio ?? 1);
        y =
          (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
          (window.devicePixelRatio ?? 1);
      }
    } else if (event.nativeEvent instanceof MouseEvent) {
      setUseType("mouse");
      pressure = 1.0;
      x =
        (event.nativeEvent.clientX - canvasPosition.x) *
          window.devicePixelRatio ?? 1;
      y =
        (event.nativeEvent.clientY - canvasPosition.y) *
          window.devicePixelRatio ?? 1;
    }

    setIsMouseDown(true);

    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;

    setContentPoints([...contectPoints, { x, y, lineWidth }]);
    drawOnCanvas(contectPoints);

    setIsMouseDown(false);
  };

  const handleCanvasMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;
    let x = 0;
    let y = 0;

    x =
      (event.nativeEvent.clientX - canvasPosition.x) *
        window.devicePixelRatio ?? 1;
    y =
      (event.nativeEvent.clientY - canvasPosition.y) *
        window.devicePixelRatio ?? 1;

    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;

    setUseType("mouse");
    setIsMouseDown(true);
    setContentPoints([...contectPoints, { x, y, lineWidth }]);
    drawOnCanvas(contectPoints);
  };

  const handleCanvasTouchStart = (
    event: React.TouchEvent<HTMLCanvasElement>
  ) => {
    setUseType("touch");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const canvasContext = canvas.getContext("2d");
    if (!canvasPosition) return;
    if (!canvasContext) return;

    let pressure = 1.0;
    let x = 0;
    let y = 0;

    console.log(event.nativeEvent.touches[0]["force"]);

    if (event.nativeEvent.touches[0]["force"] > 0) {
      pressure = event.nativeEvent.touches[0]["force"];
      setUseType("pencil");
      x =
        (event.nativeEvent.touches[0].clientX - canvasPosition.x) *
        (window.devicePixelRatio ?? 1);
      y =
        (event.nativeEvent.touches[0].clientY - canvasPosition.y) *
        (window.devicePixelRatio ?? 1);
    }

    setIsMouseDown(true);
    const lineWidth = Math.log(pressure + 1) * 40;

    canvasContext.lineWidth = lineWidth;

    setContentPoints([...contectPoints, { x, y, lineWidth }]);
    drawOnCanvas(contectPoints);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <CanvasContainer ref={canvasContainerRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handleMove}
        onMouseMove={handleMove}
        onMouseUp={drowEnd}
        onTouchEnd={drowEnd}
      />
      <DrawInfoContainer>
        <div>{`현재사용타입: ${UseType[useType]}`}</div>
        <div>{`lineWidth: ${
          contectPoints.length === 0 ? 0 : contectPoints[0].lineWidth
        }`}</div>
      </DrawInfoContainer>
    </CanvasContainer>
  );
};

const CanvasContainer = styled("div")(({ theme }) => ({
  height: `calc(100vh - ${theme.spacing(20)})`,
  background: "white",
  margin: theme.spacing(1),
}));

const DrawInfoContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 150,
  left: 40,
}));

export default Canvas;
