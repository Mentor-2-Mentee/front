import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import MarkupEditer from "../../../commonElements/MarkupEditer";
import { RootContext } from "../../../hooks/context/RootContext";
import {
  Inquery,
  usePostInqueryMutation,
} from "../../../hooks/queries/inquery";
import { getCookieValue } from "../../../utils";

interface InqueryWriteProps {
  rewriteInquery?: Inquery;
  isRewrite?: boolean;
}

export const InqueryWrite = ({
  rewriteInquery,
  isRewrite,
}: InqueryWriteProps) => {
  const { id, userName } = useContext(RootContext);
  const [title, setTitle] = useState<string>(rewriteInquery?.title || "");
  const [guestName, setGuestName] = useState<string>(
    rewriteInquery?.guestName || ""
  );
  const [guestPassword, setGuestPassword] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(
    rewriteInquery?.isPrivate || true
  );
  const [description, setDescription] = useState<string>(
    rewriteInquery?.description || ""
  );
  const navigation = useNavigate();

  const { mutate: postInqueryMutate } = usePostInqueryMutation();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGuestName(event.target.value);
  const handleGuestPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setGuestPassword(event.target.value);
  const toggleIsPrivateCheck = () => setIsPrivate(!isPrivate);
  const handleCancleButton = () => navigation(-1);

  const handleSubmitButton = useCallback(() => {
    postInqueryMutate({
      token: getCookieValue("accessToken"),
      body: {
        title,
        description,
        guestName,
        guestPassword,
        isPrivate,
      },
    });
  }, [
    postInqueryMutate,
    title,
    description,
    guestName,
    guestPassword,
    isPrivate,
  ]);

  const handleUpdateButton = useCallback(() => {}, []);

  return (
    <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          name="title"
          size="small"
          label="닉네임"
          error={guestName.length > 10}
          helperText={guestName.length > 10 ? "닉네임은 10자 이하만 가능" : ""}
          disabled={Boolean(userName)}
          sx={{ mr: 1 }}
          value={userName ? userName : guestName}
          onChange={handleGuestNameChange}
        />

        {id === undefined ? (
          <TextField
            variant="outlined"
            name="title"
            size="small"
            label="비밀번호"
            type={"password"}
            error={guestPassword.length > 36}
            helperText={
              guestPassword.length > 10 ? "비밀번호는 36자 이하만 가능" : ""
            }
            value={guestPassword}
            onChange={handleGuestPasswordChange}
            sx={{ mr: 2 }}
          />
        ) : null}

        <FormControlLabel
          control={
            <Checkbox
              value={isPrivate}
              defaultChecked
              onChange={toggleIsPrivateCheck}
            />
          }
          label="비밀글"
        />
      </Box>

      <TextField
        variant="outlined"
        name="title"
        size="small"
        label="문의 제목"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        sx={{ mb: 1 }}
      />
      <MarkupEditer usePostState={[description, setDescription]} />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleCancleButton}>
          취소
        </Button>
        {isRewrite ? (
          <Button variant="contained" onClick={handleUpdateButton}>
            수정
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmitButton}>
            등록
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default InqueryWrite;
