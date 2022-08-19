import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestionTag } from "../../api/questionTag/createQuestionTag";
import { getUseableNewName } from "../../api/user/getUseableNewName";
import { updateUserProfile } from "../../api/user/updateUserProfile";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import ApiFetchEventHandler from "../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../utils/handleCookieValue";

export const UserProfilePage = (): JSX.Element => {
  const { userId, username, setRootContext } = useContext(RootContext);
  const navigation = useNavigate();

  const [usernameInput, setUsernameInput] = useState<string>(username || "");
  const [canUse, setCanUse] = useState<boolean>(false);
  const [checkResultMessage, setCheckResultMessage] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const handleInputUsername = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameInput(event.target.value);
  };
  const handleCancelButton = () => {
    navigation(-1);
  };

  const getResult = async (params: string) => {
    const { message, canUse } = await getUseableNewName(params);

    if (username === params) {
      setCanUse(true);
      return;
    }
    setCanUse(canUse);
    setCheckResultMessage(message);
  };

  const setApiHandler = new ApiFetchEventHandler<string>(getResult, 500);
  const debouncedNameCheck = useCallback((params: string) => {
    setApiHandler.debounce(params);
  }, []);

  useEffect(() => {
    debouncedNameCheck(usernameInput);
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
    <BackgroundBox>
      <UserProfilePageContainer>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          계정정보수정
        </Typography>
        <InputUsernameLabel htmlFor="username">
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              marginRight: theme.spacing(2),
            })}
          >
            닉네임
          </Typography>
          <TextField
            error={!canUse}
            id="username"
            size="small"
            value={usernameInput}
            onChange={handleInputUsername}
            sx={(theme) => ({
              width: theme.spacing(35),
              marginRight: theme.spacing(2),
            })}
          />
          {canUse ? null : (
            <Typography variant="subtitle1" sx={{ color: SignatureColor.RED }}>
              {checkResultMessage}
            </Typography>
          )}
        </InputUsernameLabel>
        <ButtonContainer>
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
        </ButtonContainer>
      </UserProfilePageContainer>
    </BackgroundBox>
  );
};

const BackgroundBox = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  padding: theme.spacing(15, 15, 30, 15),
}));

const UserProfilePageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 15, 10, 15),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),

  "& > *": {
    marginBottom: theme.spacing(3),
  },
}));

const InputUsernameLabel = styled("label")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  marginLeft: theme.spacing(2),
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  justifyContent: "end",

  "& > button": {
    marginLeft: theme.spacing(2),
  },
}));

export default UserProfilePage;
