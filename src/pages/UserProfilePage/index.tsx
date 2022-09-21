import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUseableNewName } from "../../api/user/getUseableNewName";
import { updateUserProfile } from "../../api/user/updateUserProfile";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import ApiFetchEventHandler from "../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../utils/handleCookieValue";

export const UserProfilePage = (): JSX.Element => {
  const { username, setRootContext } = useContext(RootContext);
  const navigation = useNavigate();

  const [usernameInput, setUsernameInput] = useState<string>(username || "");
  const [canUse, setCanUse] = useState<boolean>(false);
  const [checkResultMessage, setCheckResultMessage] = useState<string>("");
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const { enqueueSnackbar } = useSnackbar();

  const handleInputUsername = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameInput(event.target.value);
  };
  const handleCancelButton = () => {
    navigation(-1);
  };

  const getResult = async () => {
    const { message, canUse } = await getUseableNewName(usernameInput);

    if (username === usernameInput) {
      setCanUse(true);
      return;
    }
    setCanUse(canUse);
    setCheckResultMessage(message);
  };

  const setApiHandler = new ApiFetchEventHandler(getResult, 500);
  const debouncedNameCheck = useCallback(() => {
    setApiHandler.debounce();
  }, [usernameInput]);

  useEffect(() => {
    debouncedNameCheck();
  }, [usernameInput]);

  const handleUpdateProfileButton = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    const result = await updateUserProfile({
      token: accessToken,
      newUsername: usernameInput,
    });

    setRootContext({
      userId: result.userId,
      username: result.username,
      userGrade: result.userGrade,
    });
    enqueueSnackbar("성공적으로 수정되었습니다.", { variant: "success" });
  };

  return (
    <Box
      sx={(theme) => ({
        background: SignatureColor.GRAY,
        padding: isWidthShort
          ? theme.spacing(2, 2, 2, 2)
          : theme.spacing(4, 4, 4, 4),
        minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
      })}
    >
      <Box
        sx={(theme) => ({
          padding: isWidthShort
            ? theme.spacing(3, 3, 3, 3)
            : theme.spacing(6, 6, 6, 6),
          background: SignatureColor.WHITE,
          borderRadius: theme.spacing(3),
          minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,

          "& > *": {
            marginBottom: theme.spacing(3),
          },
        })}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          계정정보수정
        </Typography>
        <InputUsernameLabel htmlFor="username">
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              mr: 2,
              mb: 4,
            })}
          >
            닉네임
          </Typography>
          <Box
            sx={{
              position: "relative",
              mb: 4,
            }}
          >
            <TextField
              error={!canUse}
              id="username"
              size="small"
              value={usernameInput}
              onChange={handleInputUsername}
              sx={(theme) => ({
                width: isWidthShort ? "auto" : theme.spacing(35),
                marginRight: theme.spacing(2),
              })}
            />
            {canUse ? null : (
              <Typography
                variant="subtitle1"
                sx={{ color: SignatureColor.RED, position: "absolute" }}
              >
                {checkResultMessage}
              </Typography>
            )}
          </Box>
        </InputUsernameLabel>
        <Box
          sx={(theme) => ({
            display: "flex",
            flexFlow: "row",
            justifyContent: "end",

            "& > button": {
              marginLeft: theme.spacing(2),
            },
          })}
        >
          <Button
            variant="contained"
            sx={{
              background: SignatureColor.GRAY,
              color: SignatureColor.BLACK,
              "&:hover": {
                background: SignatureColor.RED,
                color: SignatureColor.WHITE,
              },
            }}
            onClick={handleCancelButton}
          >
            취소
          </Button>
          <Button
            disabled={!canUse}
            variant="contained"
            onClick={handleUpdateProfileButton}
          >
            수정하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const InputUsernameLabel = styled("label")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  marginLeft: theme.spacing(2),
}));

export default UserProfilePage;
