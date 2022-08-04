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
  targetContainerRef: React.RefObject<HTMLDivElement>;
  animate?: (canvasCtx: CanvasRenderingContext2D) => void;
}

export const useCanvasRef = ({
  targetContainerRef,
  animate,
}: UseCanvasRefParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  const resizeCanvas = useCallback(() => {
    if (!targetContainerRef.current) return;
    setCanvasSize({
      width: targetContainerRef.current.clientWidth,
      height: targetContainerRef.current.clientHeight,
    });
  }, [targetContainerRef]);

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
