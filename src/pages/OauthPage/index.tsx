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
  useGetTokenQuery,
  useGetUserProfileQuery,
} from "../../hooks/queries/auth";
import { SignatureColor } from "../../commonStyles/CommonColor";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, _] = useSearchParams();
  const { setRootContextState } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string | undefined>(
    getCookieValue("accessToken")
  );

  const tokenQuery = useGetTokenQuery({
    authCode: searchParams.get("code"),
  });
  const userProfileQuery = useGetUserProfileQuery({
    token,
  });

  useEffect(() => {
    if (tokenQuery.status !== "success") return;
    saveValuesToCookie({
      accessToken: tokenQuery.data.accessToken,
      refreshToken: tokenQuery.data.refreshToken,
    });
    if (tokenQuery.data.isFirstSignIn) {
      alert("처음이시군요!");
    }
    setToken(tokenQuery.data.accessToken);
  }, [tokenQuery.data, tokenQuery.status]);

  useEffect(() => {
    if (userProfileQuery.status !== "success") return;
    setRootContextState((current) => ({
      ...current,
      id: userProfileQuery.data.userProfile.id,
      userName: userProfileQuery.data.userProfile.userName,
      userGrade: userProfileQuery.data.userProfile.userGrade,
    }));
    navigation(window.localStorage.getItem("latestPath") || "/main");
    enqueueSnackbar(
      `${userProfileQuery.data.userProfile.userName}님 환영합니다`,
      {
        variant: "success",
      }
    );
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
