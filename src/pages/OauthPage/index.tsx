import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import qs from "qs";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   console.log(searchParams.get("code"));

  //   const throwCodeToServer = async () => {
  //     const body = {
  //       accessToken: searchParams.get("code"),
  //     };
  //     const response = await axiosInstance().post("/oauth", body);
  //     console.log(response.data);
  //   };
  //   throwCodeToServer();

  //   setTimeout(async () => {
  //     //   navigation("/main");
  //   }, 3000);
  // }, [searchParams]);

  const getKakaoToken = async () => {
    const res = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: "f20dba43d494e8d272df25a45e0abe67",
        // client_secret: kakao.clientSecret,
        redirect_uri: "http://localhost:3801/oauth",
        code: "FW1cNH2lk9LUNMF1p3DvnoMUrKLPvfHXkm63YRVdDtiWBPcFwDBxK0t7Iyvzd4BuxTFX1Qo9dZsAAAGBhPPSQA",
      }),
    });
    console.log(res.data);
  };

  useEffect(() => {
    // getKakaoToken();
  }, []);

  return (
    <>
      <div>로그인 되었습니다 메인페이지로 이동합니다.</div>
    </>
  );
};
