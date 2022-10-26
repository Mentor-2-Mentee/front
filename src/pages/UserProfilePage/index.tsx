import {
  Box,
  Button,
  Container,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { useUpdateUserProfileMutation } from "../../hooks/queries/auth";
import { useGetNewNameCheckQuery } from "../../hooks/queries/auth/useGetNewNameCheckQuery";
import { getCookieValue, useDebounce } from "../../utils";

export const UserProfilePage = (): JSX.Element => {
  const { userName } = useContext(RootContext);
  const [usernameInput, setUsernameInput] = useState<string>(userName || "");
  const [canUse, setCanUse] = useState<boolean>(false);
  const [checkResultMessage, setCheckResultMessage] = useState<string>("");

  const isWidthShort = useMediaQuery("(max-width:900px)");
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const debouncedInputValue = useDebounce<string>(usernameInput);
  const newNameCheckQuery = useGetNewNameCheckQuery({
    newName: debouncedInputValue,
  });
  const userProfileMutation = useUpdateUserProfileMutation(enqueueSnackbar);

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsernameInput(event.target.value);
  const handleCancelButton = () => navigation(-1);

  const handleSubmitButton = () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    userProfileMutation.mutate({
      token,
      newName: debouncedInputValue,
    });
  };

  useEffect(() => {
    if (newNameCheckQuery.status !== "success") return;
    setCanUse(newNameCheckQuery.data.canUse);
    setCheckResultMessage(newNameCheckQuery.data.message);
  }, [newNameCheckQuery.status, newNameCheckQuery.data]);

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box sx={PageInnerBoxSxProps(isWidthShort)}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          계정정보수정
        </Typography>
        <InputUsernameLabel htmlFor="userName">
          <Typography
            variant="subtitle1"
            sx={{
              mr: 2,
              mb: 4,
            }}
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
              id="userName"
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
            onClick={handleSubmitButton}
          >
            수정하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const PageContainerSxProps = (isWidthShort: boolean) => (theme: Theme) => ({
  background: SignatureColor.GRAY,
  padding: isWidthShort ? theme.spacing(2, 2, 2, 2) : theme.spacing(4, 4, 4, 4),
  minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
});

const PageInnerBoxSxProps = (isWidthShort: boolean) => (theme: Theme) => ({
  padding: isWidthShort ? theme.spacing(3, 3, 3, 3) : theme.spacing(6, 6, 6, 6),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),
  minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,
  "& > *": {
    marginBottom: theme.spacing(3),
  },
});

const InputUsernameLabel = styled("label")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  marginLeft: theme.spacing(2),
}));

export default UserProfilePage;
