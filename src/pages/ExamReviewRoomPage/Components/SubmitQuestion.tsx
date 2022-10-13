import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ImageUpload, { ImageFile } from "../../../commonElements/ImageUpload";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface SubmitQuestionProps {
  questionCount: number;
}

export const SubmitQuestion = ({ questionCount }: SubmitQuestionProps) => {
  const [qustionIndex, setQuestionIndex] = useState<number>(1);
  const [questionText, setQuestionText] = useState<string>("");
  const [answerExample, setAnswerExample] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [questionImageUrl, setQuestionImageUrl] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleIndexChange = (event: SelectChangeEvent) => {
    setQuestionIndex(Number(event.target.value));
  };
  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setQuestionText(event.target.value);

  const handleAnswerExampleChange =
    (answerIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentAnswerExample = answerExample.concat();
      currentAnswerExample[answerIndex] = event.target.value;
      setAnswerExample(currentAnswerExample);
    };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexFlow: "column",
        overflow: "scroll",
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(23.5)} )`,
        p: 1,
      })}
    >
      <FormControl>
        <InputLabel>문제번호</InputLabel>
        <Select
          value={String(qustionIndex)}
          label="문제번호"
          onChange={handleIndexChange}
        >
          {[...Array(questionCount).keys()].map((index) => {
            return (
              <MenuItem key={index} value={index}>{`${index + 1}번`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Box>
        <FormControl variant="filled" sx={{ mb: 1, pl: 1, pr: 1 }}>
          <InputLabel sx={{ pl: 2 }}>문제 본문</InputLabel>
          <OutlinedInput
            multiline
            rows={5}
            value={questionText}
            onChange={handleQuestionTextChange}
            sx={{ pt: 3, mb: 1 }}
          />
          {questionImageUrl[0] ? (
            <img
              src={questionImageUrl[0]}
              alt={`문제 이미지`}
              style={{
                width: "100%",
                maxWidth: 400,
              }}
            />
          ) : null}
          <Button sx={{ mb: 1 }} onClick={handleOpen}>
            {questionImageUrl[0]
              ? "문제 본문 이미지 수정"
              : "문제 본문 이미지 추가"}
          </Button>
          {questionImageUrl[0] ? (
            <Button
              color="error"
              onClick={() => {
                setQuestionImageUrl([]);
              }}
            >
              {"이미지 삭제"}
            </Button>
          ) : null}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: SignatureColor.GRAY,
                borderRadius: 3,
                width: 300,
                boxShadow: 24,
                display: "flex",
                flexFlow: "column",
                alignItems: "center",

                "& > *": {
                  mb: 1,
                },
              }}
            >
              <ImageUpload
                useImageUrlState={[questionImageUrl, setQuestionImageUrl]}
                multipleUpload
              />
              {/* <Button
                variant="contained"
                sx={{ width: 250, mb: 2 }}
                disabled={postQuestionImageMutation.isLoading}
                onClick={() => {
                  const accessToken = getCookieValue("accessToken");
                  postQuestionImageMutation.mutate({
                    token: accessToken,
                    imageFileList: questionImageFile,
                  });
                }}
              >
                {postQuestionImageMutation.isLoading ? "Loading..." : "업로드"}
              </Button> */}
            </Box>
          </Modal>
          {answerExample.map((answer, index) => {
            return (
              <FormControl
                variant="filled"
                key={index}
                sx={{ mb: 2, position: "relative" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, whiteSpace: "nowrap" }}
                  >
                    {answerExample.length === 1
                      ? "주관식"
                      : `보기 ${index + 1}`}
                  </Typography>
                  <OutlinedInput
                    size="small"
                    value={answer}
                    onChange={handleAnswerExampleChange(index)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => {
                      const newAnswerExample = answerExample.filter(
                        (answer, answerIndex) => answerIndex !== index
                      );
                      setAnswerExample(newAnswerExample);
                    }}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </Box>
              </FormControl>
            );
          })}
          <IconButton
            color="primary"
            onClick={() => {
              setAnswerExample([...answerExample, ""]);
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </FormControl>
      </Box>
      <Button variant="contained">제출하기</Button>
    </Box>
  );
};

export default SubmitQuestion;
