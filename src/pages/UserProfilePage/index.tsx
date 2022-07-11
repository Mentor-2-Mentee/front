import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUseableNewName } from "../../api/getUseableNewName";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../context/RootContext";
import ApiFetchHandler from "../../utils/ApiFetchHandler";

export const UserProfilePage = (): JSX.Element => {
  const { userId, userName } = useContext(RootContext);
  const navigation = useNavigate();

  const [userNameInput, setUserNameInput] = useState<string>(userName || "");
  const [canUse, setCanUse] = useState<boolean>(false);
  const [checkResultMessage, setCheckResultMessage] = useState<string>("");

  const handleInputUserName = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserNameInput(event.target.value);
  };
  const handleCancelButton = () => {
    navigation(-1);
  };

  const getResult = async (params: string) => {
    const { message, canUse } = await getUseableNewName(params);

    if (userName === params) {
      setCanUse(true);
      return;
    }
    setCanUse(canUse);
    setCheckResultMessage(message);
  };

  const setApiHandler = new ApiFetchHandler<string>(getResult, 500);
  const debouncedNameCheck = useCallback((params: string) => {
    setApiHandler.debounce(params);
  }, []);

  useEffect(() => {
    debouncedNameCheck(userNameInput);
  }, [userNameInput]);

  return (
    <BackgroundBox>
      <UserProfilePageContainer>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          계정정보수정
        </Typography>
        <InputUserNameLabel htmlFor="userName">
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
            id="userName"
            size="small"
            value={userNameInput}
            onChange={handleInputUserName}
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
        </InputUserNameLabel>
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
            variant="contained"
            // onClick={debouncedCreateQuestionRoom}
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

const InputUserNameLabel = styled("label")(({ theme }) => ({
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
