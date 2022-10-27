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
import PostEditer from "../../../commonElements/PostEditer";

interface SubmitQuestionProps {
  questionCount: number;
}

export const SubmitQuestion = ({ questionCount }: SubmitQuestionProps) => {
  const [qustionIndex, setQuestionIndex] = useState<number>(0);
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
        height: "95%",
        p: 2,
      })}
    >
      <FormControl sx={{ mb: 2 }}>
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

      <PostEditer usePostState={[questionText, setQuestionText]} />

      <Box sx={{ display: "flex", flexFlow: "column", mt: 2 }}>
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
                  {answerExample.length === 1 ? "주관식" : `보기 ${index + 1}`}
                </Typography>
                <OutlinedInput
                  size="small"
                  fullWidth
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
      </Box>
      <Button variant="contained">제출하기</Button>
    </Box>
  );
};

export default SubmitQuestion;
