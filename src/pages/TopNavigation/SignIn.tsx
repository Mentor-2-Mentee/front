import { styled, SxProps } from "@mui/system";
import { useRef, useState } from "react";
import {
  Modal,
  TextField,
  Typography,
  Box,
  Button,
  InputAdornment,
  IconButton,
  Backdrop,
  Fade,
  Slide,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInByEmail, SignInParams } from "../../api/signIn";
import React from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { signInByKakao } from "../../api/signInByKakao";

const initialUserInputParams: SignInParams = {
  email: "",
  password: "",
};

export const SignIn = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [userInputParams, setUserInputParams] = useState<SignInParams>(
    initialUserInputParams
  );

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setUserInputParams(initialUserInputParams);
  };

  return (
    <>
      <div onClick={handleOpen}>SignIn</div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
          <Box sx={modalBoxStyle}>
            <Typography
              component="div"
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
            >
              로그인
            </Typography>
            <hr />

            <SignInByKakaoTalk
              href={`${import.meta.env.VITE_APP_BASEURL}/auth/kakao`}
            >
              <img
                src={`${
                  import.meta.env.VITE_APP_BASEURL
                }/icons/kakaoTalkIcon.svg`}
                alt="kakaoIcon"
              />
              <SignInByKakaoTalkText>카카오로 시작하기</SignInByKakaoTalkText>
            </SignInByKakaoTalk>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

const modalBoxStyle: SxProps = {
  position: "absolute",
  top: "calc(50% - 200px)",
  left: "calc(50% - 200px)",
  width: "300px",
  backgroundColor: SignatureColor.WHITE,
  boxShadow: 24,
  padding: 6,
};

const SignInByKakaoTalk = styled("a")(({ theme }) => ({
  display: "flex",
  backgroundColor: SignatureColor.KAKAO_YELLOW,
  textDecoration: "none",
  color: SignatureColor.BLACK_80,
  borderRadius: theme.spacing(1),
  height: theme.spacing(5),
  alignItems: "center",
  fontWeight: "bold",
  position: "relative",

  "& > img": {
    width: theme.spacing(4),
    marginLeft: theme.spacing(0.5),
  },
}));

const SignInByKakaoTalkText = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  left: "50%",
  transform: "translate(-50%,0%)",
}));

export default SignIn;
