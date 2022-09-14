import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "@mui/system";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { RootContext } from "../../hooks/context/RootContext";
import {
  getCookieValue,
  saveValuesToCookie,
} from "../../utils/handleCookieValue";
import {
  usePostAuthCodeQuery,
  useGetUserProfileQuery,
} from "../../hooks/queries/Auth";
import { SignatureColor } from "../../commonStyles/CommonColor";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRootContext } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const [accessToken, setAccessToken] = useState<string | undefined>(
    getCookieValue("accessToken")
  );

  const authCodeQuery = usePostAuthCodeQuery(
    searchParams.get("code") || undefined
  );
  const userProfileQuery = useGetUserProfileQuery(accessToken);

  useEffect(() => {
    if (authCodeQuery.status !== "success") return;
    saveValuesToCookie({
      accessToken: authCodeQuery.data.accessToken,
      refreshToken: authCodeQuery.data.refreshToken,
    });
    setAccessToken(authCodeQuery.data.accessToken);
    if (authCodeQuery.data.isFirstSignIn) {
      alert("처음이시군요!");
    }
  }, [authCodeQuery.data, authCodeQuery.status]);

  useEffect(() => {
    if (userProfileQuery.status !== "success") return;
    setRootContext({
      userId: userProfileQuery.data.userId,
      username: userProfileQuery.data.username,
      userGrade: userProfileQuery.data.userGrade,
    });
    navigation(-1);
    enqueueSnackbar(`${userProfileQuery.data.username}님 환영합니다`, {
      variant: "success",
    });
  }, [userProfileQuery.data, userProfileQuery.status]);

  return (
    <Modal open={true}>
      <ModalContainer>
        <Typography variant="h6" component="h2">
          로그인 중 입니다
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
          }}
        >
          잠시만 기다려주세요
        </Typography>
        <CircularProgress />
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  backgroundColor: SignatureColor.WHITE,
  border: `2px solid ${SignatureColor.BLACK}`,
  padding: theme.spacing(2, 4, 3, 4),
}));

export default OauthPage;
