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
  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickEmailSignInButton = async () => {
    if (userInputParams.email === "" || userInputParams.password === "") return;

    const data = await signInByEmail(userInputParams);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInputParams({
      ...userInputParams,
      [event.currentTarget.name]: event.currentTarget.value,
    });
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
              하지마루요
            </Typography>

            <hr />
            <SignInByEmailTextFields>
              <Typography
                component="div"
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                이메일로 로그인하기
              </Typography>
              <TextField
                label="Email"
                type="email"
                size="small"
                sx={{ mb: 1 }}
                name="email"
                value={userInputParams.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                size="small"
                name="password"
                value={userInputParams.password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isShowPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Button variant="outlined" onClick={handleClickEmailSignInButton}>
                Sign In
              </Button>
            </SignInByEmailTextFields>
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

const SignInByEmailTextFields = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
}));

export default SignIn;
