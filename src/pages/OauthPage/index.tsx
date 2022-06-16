import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("code"));

    const throwCodeToServer = async () => {
      const body = {
        accessToken: searchParams.get("code"),
      };
      const response = await axiosInstance().post("/oauth", body);
      console.log(response.data);
    };
    throwCodeToServer();

    setTimeout(async () => {
      //   navigation("/main");
    }, 3000);
  }, [searchParams]);

  return (
    <>
      <div>로그인 되었습니다 메인페이지로 이동합니다.</div>
    </>
  );
};
