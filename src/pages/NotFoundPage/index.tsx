import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [navigateTimer, setNavigateTimer] = useState<number>();

  const moveToMain = useCallback(() => {
    navigation("/main");
  }, []);

  useEffect(() => {
    setNavigateTimer((cur) => {
      const im = window.setTimeout(moveToMain, 3000);
      console.log("im", im);
      return im;
    });

    return () => {
      setNavigateTimer((cur) => {
        window.clearTimeout(cur);
        return undefined;
      });
    };
  }, []);

  return (
    <>
      <div>잘못된 접근입니다.</div>
      <div>잠시 후, 메인 페이지로 이동합니다.</div>
    </>
  );
};

export default NotFoundPage;
