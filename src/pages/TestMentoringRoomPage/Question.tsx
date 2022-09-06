import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

type AnswerExample = {
  exampleText: string;
};

const InitialAnswerExample = (count = 5): AnswerExample[] => {
  return [...Array(count)].map((ele) => ({ exampleText: "" }));
};

export const Question = () => {
  const [questionText, setQuestionText] = useState<string>("");

  const [answerExampleList, setAnswerExampleList] = useState<AnswerExample[]>(
    InitialAnswerExample(5)
  );

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionText(event.target.value);
  };

  const handleAnswerExampleChange =
    (exampleIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAnswerExampleList;
    };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        overflow: "scroll",
        height: 500,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">1번 문제</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="객관식" />
      </Box>
      <FormControl variant="filled" sx={{ mb: 3 }}>
        <InputLabel>문제 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={4}
          value={questionText}
          onChange={handleQuestionTextChange}
        />
        <FormHelperText>미도리님 외 1명이 작성중입니다</FormHelperText>
      </FormControl>

      {answerExampleList.map((ele, index) => {
        return (
          <FormControl variant="filled" key={index}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ ml: 1, mr: 1 }}>
                {`보기 ${index + 1}`}
              </Typography>
              <OutlinedInput
                size="small"
                value={questionText}
                onChange={handleAnswerExampleChange(index)}
              />
            </Box>
            <FormHelperText sx={{ ml: 9 }}>
              미도리님 외 1명이 작성중입니다
            </FormHelperText>
          </FormControl>
        );
      })}
    </Box>
  );
};

export default Question;
