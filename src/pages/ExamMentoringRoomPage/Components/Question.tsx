import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  ExamQuestion,
  QuestionType,
} from "../../../hooks/queries/examMentoringRoom";

interface QuestionProps {
  nowQuestionIndex: number;
  nowQuestion: ExamQuestion;
  sendChangeData: (
    nowQuestionIndex: number,
    updateExamQuestionData: ExamQuestion
  ) => void;
}

export const Question = ({
  nowQuestionIndex,
  nowQuestion,
  sendChangeData,
}: QuestionProps) => {
  const [questionText, setQuestionText] = useState<string>("");
  const [answerExampleList, setAnswerExampleList] = useState<string[]>([""]);
  const [questionType, setQuestionType] =
    useState<QuestionType>("MULTIPLE_CHOICE");
  const [solution, setSolution] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const [throttleTimer, setThrottleTimer] =
    useState<number | undefined>(undefined);

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionText(event.target.value);

    if (throttleTimer) return;
    const timer = window.setTimeout(() => {
      sendChangeData(nowQuestionIndex, {
        ...nowQuestion,
        questionText: event.target.value,
      });
      setThrottleTimer(undefined);
    }, 1000);
    setThrottleTimer(timer);
  };

  const handleAnswerExampleChange =
    (answerExampleIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswerExampleList = answerExampleList.concat();
      newAnswerExampleList[answerExampleIndex] = event.target.value;
      setAnswerExampleList(newAnswerExampleList);

      if (throttleTimer) return;
      const timer = window.setTimeout(() => {
        const newAnswerExampleList = answerExampleList.concat();
        newAnswerExampleList[answerExampleIndex] = event.target.value;
        sendChangeData(nowQuestionIndex, {
          ...nowQuestion,
          answerExampleList: newAnswerExampleList,
        });
        setThrottleTimer(undefined);
      }, 1000);
      setThrottleTimer(timer);
    };

  const handleQuestionType = () => {
    if (questionType === "MULTIPLE_CHOICE") {
      setQuestionType("ESSAY_QUESTION");

      if (throttleTimer) return;
      const timer = window.setTimeout(() => {
        sendChangeData(nowQuestionIndex, {
          ...nowQuestion,
          questionType: "ESSAY_QUESTION",
        });
        setThrottleTimer(undefined);
      }, 300);
      setThrottleTimer(timer);
      return;
    }
    setQuestionType("MULTIPLE_CHOICE");

    if (throttleTimer) return;
    const timer = window.setTimeout(() => {
      sendChangeData(nowQuestionIndex, {
        ...nowQuestion,
        questionType: "MULTIPLE_CHOICE",
      });
      setThrottleTimer(undefined);
    }, 300);
    setThrottleTimer(timer);
  };

  const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolution(event.target.value);

    if (throttleTimer) return;
    const timer = window.setTimeout(() => {
      sendChangeData(nowQuestionIndex, {
        ...nowQuestion,
        solution: event.target.value,
      });
      setThrottleTimer(undefined);
    }, 1000);
    setThrottleTimer(timer);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);

    if (throttleTimer) return;
    const timer = window.setTimeout(() => {
      sendChangeData(nowQuestionIndex, {
        ...nowQuestion,
        answer: event.target.value,
      });
      setThrottleTimer(undefined);
    }, 1000);
    setThrottleTimer(timer);
  };

  useEffect(() => {
    setQuestionText(nowQuestion.questionText);
    setAnswerExampleList(nowQuestion.answerExampleList);
    setQuestionType(nowQuestion.questionType);
    setSolution(nowQuestion.solution);
    setAnswer(nowQuestion.answer);
  }, [nowQuestion]);

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
        <FormControlLabel
          control={
            <Switch
              value={questionType !== "MULTIPLE_CHOICE"}
              onChange={handleQuestionType}
              defaultChecked
            />
          }
          label={"객관식"}
        />
      </Box>
      <FormControl variant="filled" sx={{ mb: 4, pl: 1, pr: 1 }}>
        <InputLabel sx={{ pl: 2 }}>문제 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={5}
          value={questionText}
          onChange={handleQuestionTextChange}
          // onFocus={(e) => {}}
          sx={{ pt: 3 }}
        />
        <FormHelperText sx={{ position: "absolute", bottom: -22 }}>
          {/* 미도리님이 작성중입니다 */}
        </FormHelperText>
      </FormControl>

      {answerExampleList.map((answerExample, index) => {
        return (
          <FormControl
            variant="filled"
            key={index}
            sx={{ mb: 3, position: "relative" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ ml: 1, mr: 1 }}>
                {questionType === "MULTIPLE_CHOICE"
                  ? `보기 ${index + 1}`
                  : `주관식 ${index + 1}`}
              </Typography>
              <OutlinedInput
                size="small"
                value={answerExample}
                onChange={handleAnswerExampleChange(index)}
              />
            </Box>
            <FormHelperText sx={{ ml: 8, position: "absolute", bottom: -22 }}>
              {/* 미도리님 외 1명이 작성중입니다 */}
            </FormHelperText>
          </FormControl>
        );
      })}

      <Typography variant="h6" sx={{ pt: 3, ml: 1, mr: 1 }}>
        {`${nowQuestionIndex + 1}번 풀이`}
      </Typography>
      <FormControl variant="filled" sx={{ mb: 4, pl: 1, pr: 1 }}>
        <InputLabel sx={{ pl: 2 }}>풀이 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={5}
          value={solution}
          onChange={handleSolutionChange}
          sx={{ pt: 3 }}
        />
        <FormHelperText sx={{ position: "absolute", bottom: -22 }}>
          {/* 미도리님 외 1명이 작성중입니다 */}
        </FormHelperText>
      </FormControl>

      <FormControl variant="filled" sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ ml: 1, mr: 1 }}>
            정답
          </Typography>
          <OutlinedInput
            size="small"
            value={answer}
            onChange={handleAnswerChange}
          />
        </Box>
        <FormHelperText sx={{ ml: 6 }}>
          {/* 미도리님 외 1명이 작성중입니다 */}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Question;
