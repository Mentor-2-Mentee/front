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

interface QuestionProps {
  nowQuestionIndex: number;
}

export const Question = ({ nowQuestionIndex }: QuestionProps) => {
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
      sx={(theme) => ({
        display: "flex",
        flexFlow: "column",
        overflow: "scroll",
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(23.5)} )`,
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Typography variant="h5">{`${nowQuestionIndex + 1}번 문제`}</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="객관식" />
      </Box>
      <FormControl variant="filled" sx={{ mb: 4, pl: 1, pr: 1 }}>
        <InputLabel sx={{ pl: 2 }}>문제 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={5}
          value={questionText}
          onChange={handleQuestionTextChange}
          onFocus={(e) => {}}
        />
        <FormHelperText sx={{ position: "absolute", bottom: -22 }}>
          미도리님이 작성중입니다
        </FormHelperText>
      </FormControl>

      {answerExampleList.map((ele, index) => {
        return (
          <FormControl
            variant="filled"
            key={index}
            sx={{ mb: 3, position: "relative" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ ml: 1, mr: 1 }}>
                {`보기 ${index + 1}`}
              </Typography>
              <OutlinedInput
                size="small"
                value={questionText}
                onChange={handleAnswerExampleChange(index)}
              />
            </Box>
            <FormHelperText sx={{ ml: 8, position: "absolute", bottom: -22 }}>
              미도리님 외 1명이 작성중입니다
            </FormHelperText>
          </FormControl>
        );
      })}

      <Typography variant="h6" sx={{ pt: 3, ml: 1, mr: 1 }}>
        {`${nowQuestionIndex + 1}번 풀이`}
      </Typography>
      <FormControl variant="filled" sx={{ mb: 1, pl: 1, pr: 1 }}>
        <InputLabel sx={{ pl: 2 }}>풀이 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={5}
          value={questionText}
          onChange={handleQuestionTextChange}
        />
        <FormHelperText>미도리님 외 1명이 작성중입니다</FormHelperText>
      </FormControl>
      <FormControl variant="filled">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ ml: 1, mr: 1 }}>
            정답
          </Typography>
          <OutlinedInput
            size="small"
            value={questionText}
            // onChange={handleAnswerExampleChange}
          />
        </Box>
        <FormHelperText sx={{ ml: 6 }}>
          미도리님 외 1명이 작성중입니다
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Question;
