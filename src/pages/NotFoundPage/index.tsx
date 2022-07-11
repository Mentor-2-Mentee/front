import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigation("/main");
    }, 3000);
  }, []);

  return (
    <>
      <div>잘못된 접근입니다.</div>
      <div>잠시 후, 메인 페이지로 이동합니다.</div>
    </>
  );
};

export default NotFoundPage;
