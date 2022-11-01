import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { QuestionEditer } from "../../../commonElements/QuestionEditer";

interface SubmitQuestionProps {
  questionCount: number;
}

export const SubmitQuestion = ({ questionCount }: SubmitQuestionProps) => {
  const [qustionIndex, setQuestionIndex] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string>("");

  const handleIndexChange = (event: SelectChangeEvent) => {
    setQuestionIndex(Number(event.target.value));
  };

  return (
    <Box sx={SubmitQuestionBoxSxProps}>
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

      <QuestionEditer useTextState={[questionText, setQuestionText]} />

      <Button
        variant="contained"
        onClick={() => {
          console.log(questionText);
        }}
      >
        제출하기
      </Button>
    </Box>
  );
};

const SubmitQuestionBoxSxProps: SxProps = {
  display: "flex",
  flexFlow: "column",
  overflow: "scroll",
  height: "95%",
  p: 2,
};

export default SubmitQuestion;
