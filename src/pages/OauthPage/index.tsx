import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAuthTokens, AuthTokens } from "../../api/getAuthTokens";
import { getUserProfile, UserProfile } from "../../api/getUserProfile";
import { RootContext } from "../../context/RootContext";
import { saveValuesToCookie } from "../../utils/handleCookieValue";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRootContext } = useContext(RootContext);

  const authorization = async (code: string) => {
    const response = await getAuthTokens(code);
    if (response === null) return;
    const nowUserProfile: UserProfile = await getUserProfile(
      response.accessToken
    );
    saveValuesToCookie(response);
    setRootContext({
      userId: nowUserProfile.userId,
      userName: nowUserProfile.userName,
    });
    navigation("/main");
  };

  useEffect(() => {
    console.log(searchParams.get("code"));
    const code = searchParams.get("code");
    if (code === null) return;
    authorization(code);
  }, []);

  return (
    <>
      <RootContext.Consumer>
        {(props) => {
          console.log(props);
          return <div>로그인 되었습니다 메인페이지로 이동합니다.</div>;
        }}
      </RootContext.Consumer>
    </>
  );
};
