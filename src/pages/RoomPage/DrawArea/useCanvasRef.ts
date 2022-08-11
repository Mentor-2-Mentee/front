import {
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface CanvasSize {
  width: number;
  height: number;
}

interface UseCanvasRefParams {
  sizeTargetContainerRef: React.RefObject<HTMLDivElement>;
  animate?: (canvasCtx: CanvasRenderingContext2D) => void;
}

export const useCanvasRef = ({
  sizeTargetContainerRef,
  animate,
}: UseCanvasRefParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  const resizeCanvas = useCallback(() => {
    if (!sizeTargetContainerRef.current) return;
    setCanvasSize({
      width: sizeTargetContainerRef.current.clientWidth,
      height: sizeTargetContainerRef.current.clientHeight,
    });
  }, [sizeTargetContainerRef]);

  const resizeEffectCallBack = (): EffectCallback => {
    return () => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    };
  };

  const canvasInitEffectCallBack = (): EffectCallback => {
    return () => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas?.getContext("2d");

      const setCanvas = () => {
        const devicePixelRatio = window.devicePixelRatio ?? 1;

        if (canvas && canvasCtx) {
          canvas.style.width = String(canvasSize.width) + "px";
          canvas.style.height = String(canvasSize.height) + "px";

          canvas.width = canvasSize.width * devicePixelRatio;
          canvas.height = canvasSize.height * devicePixelRatio;

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
    };
  };

  useEffect(resizeEffectCallBack(), []);
  useEffect(canvasInitEffectCallBack(), [canvasSize]);

  return canvasRef;
};

export default useCanvasRef;
