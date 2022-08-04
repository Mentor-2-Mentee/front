import { useEffect, useRef } from "react";

interface UseCanvasRefParams {
  canvasWidth: number;
  canvasHeight: number;
}

export const useCanvasRef = (
  { canvasWidth, canvasHeight }: UseCanvasRefParams,
  animate?: (canvasCtx: CanvasRenderingContext2D) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && canvasCtx) {
        canvas.style.width = String(canvasWidth) + "px";
        canvas.style.height = String(canvasHeight) + "px";
        // canvas.style.width = "100%";
        // canvas.style.height = "100%";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;

        canvasCtx;
      }
    };
    setCanvas();

    if (animate) {
      let reqId: number;
      const reqAnimation = () => {
        reqId = window.requestAnimationFrame(reqAnimation);

        if (canvasCtx && animate) {
          animate(canvasCtx);
        }
      };
      reqAnimation();

      return () => {
        window.cancelAnimationFrame(reqId);
      };
    }
  }, [canvasWidth, canvasHeight]);

  return canvasRef;
};

export default useCanvasRef;
