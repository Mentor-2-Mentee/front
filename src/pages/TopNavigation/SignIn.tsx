import { styled, SxProps } from "@mui/system";
import { useState } from "react";
import { Modal, Typography, Box, Backdrop, Slide } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";

import KAKAO_TALK_ICON from "../../assets/icons/kakaoTalkIcon.svg";

export const SignIn = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

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
              href={`${import.meta.env.VITE_APP_BASEURL}/oauth/kakao`}
            >
              <img src={KAKAO_TALK_ICON} alt="kakaoIcon" />
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
  left: "calc(50% - 175px)",
  width: "300px",
  backgroundColor: SignatureColor.WHITE,
  boxShadow: 24,
  padding: 3,
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
