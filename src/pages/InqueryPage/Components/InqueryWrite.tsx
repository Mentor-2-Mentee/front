import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import MarkupEditer from "../../../commonElements/MarkupEditer";
import { RootContext } from "../../../hooks/context/RootContext";

export const InqueryWrite = () => {
  const { id, userName } = useContext(RootContext);
  const [title, setTitle] = useState<string>("");
  const [instantName, setInstantName] = useState<string>("");
  const [instantPassword, setInstantPassword] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const navigation = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const handleInstantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setInstantName(event.target.value);
  const handleInstantPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setInstantPassword(event.target.value);
  const toggleIsPrivateCheck = () => setIsPrivate(!isPrivate);
  const handleCancleButton = () => navigation(-1);
  const handleSubmitButton = () => alert(`${title}, ${description}내용 제출`);

  return (
    <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          name="title"
          size="small"
          label="닉네임"
          disabled={Boolean(userName)}
          sx={{ mr: 1 }}
          value={userName ? userName : instantName}
          onChange={handleInstantNameChange}
        />

        {id === undefined ? (
          <TextField
            variant="outlined"
            name="title"
            size="small"
            label="비밀번호"
            value={instantPassword}
            onChange={handleInstantPasswordChange}
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
        <Button variant="contained" onClick={handleSubmitButton}>
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default InqueryWrite;
