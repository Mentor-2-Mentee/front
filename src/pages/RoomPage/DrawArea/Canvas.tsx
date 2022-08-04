import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import useCanvasRef from "./useCanvasRef";

interface canvasSize {
  width: number;
  height: number;
}

export const Canvas = (): JSX.Element => {
  const [canvasSize, setCanvasSize] = useState<canvasSize>({
    width: 0,
    height: 0,
  });
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasRef({
    canvasHeight: canvasSize.height,
    canvasWidth: canvasSize.width,
  });

  const resizeCanvas = useCallback(() => {
    if (!canvasContainerRef.current) return;
    setCanvasSize({
      width: canvasContainerRef.current.clientWidth,
      height: canvasContainerRef.current.clientHeight,
    });
  }, [canvasContainerRef]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <CanvasContainer ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

const CanvasContainer = styled("div")(({ theme }) => ({
  width: `calc(100% - ${theme.spacing(2)})`,
  height: `calc(100% - ${theme.spacing(2)})`,
  background: "white",
  margin: theme.spacing(1),
}));

export default Canvas;
