import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuthTokens } from "../../api/getAuthTokens";
import { getUserProfile, UserProfile } from "../../api/getUserProfile";
import { RootContext } from "../../context/RootContext";
import { saveValuesToCookie } from "../../utils/handleCookieValue";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";

export const OauthPage = (): JSX.Element => {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRootContext } = useContext(RootContext);
  const { enqueueSnackbar } = useSnackbar();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const authorization = async (code: string) => {
    try {
      const { isFirstSignIn, accessToken, refreshToken } = await getAuthTokens(
        code
      );
      if (accessToken === null || refreshToken === null) return;
      const nowUserProfile: UserProfile = await getUserProfile(accessToken);

      if (isFirstSignIn) {
        alert("처음이시군요!");
      }

      saveValuesToCookie({ accessToken, refreshToken });
      setRootContext({
        userId: nowUserProfile.userId,
        userName: nowUserProfile.userName,
      });
      navigation("/main");
      enqueueSnackbar(`${nowUserProfile.userName}님 환영합니다`, {
        variant: "success",
      });
    } catch (error) {}
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code === null) return;
    authorization(code);
  }, []);

  return (
    <>
      <RootContext.Consumer>
        {(props) => {
          return (
            <>
              <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    ...style,
                    width: 200,
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    로그인 중 입니다
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      mb: 2,
                    }}
                  >
                    잠시만 기다려주세요
                  </Typography>
                  <CircularProgress />
                </Box>
              </Modal>
            </>
          );
        }}
      </RootContext.Consumer>
    </>
  );
};
