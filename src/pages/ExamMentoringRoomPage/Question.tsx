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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { RootContext } from "../../hooks/context/RootContext";
import {
  useLiveQuestionQuery,
  useQuestionSocketQuery,
} from "../../hooks/queries/examMentoringRoom";

type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_QUESTION";

interface QuestionProps {
  nowQuestionIndex: number;
}

export const Question = ({ nowQuestionIndex }: QuestionProps) => {
  const [questionText, setQuestionText] = useState<string>("");
  const [answerExampleList, setAnswerExampleList] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [questionType, setQuestionType] =
    useState<QuestionType>("MULTIPLE_CHOICE");
  const [solution, setSolution] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionText(event.target.value);
  };

  const handleAnswerExampleChange =
    (exampleIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAnswerExampleList;
    };

  const { userId, userGrade } = useContext(RootContext);
  const { examScheduleId, examField } = useParams();
  const { getCurrentQuestion, sendWrittenData } = useQuestionSocketQuery({
    userId,
    examScheduleId,
    examField,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      getCurrentQuestion(timer);
    }, 500);
  }, []);

  const liveQuestionQuery = useLiveQuestionQuery(examScheduleId, examField);

  useEffect(() => {
    if (liveQuestionQuery.data === undefined) return;
    console.log(liveQuestionQuery.data.examQuestionList[nowQuestionIndex]);
    const targetData =
      liveQuestionQuery.data.examQuestionList[nowQuestionIndex];
    setQuestionText(targetData.questionText);
    setAnswerExampleList(targetData.answerExampleList);
    setQuestionType(targetData.questionType);
    setSolution(targetData.solution);
    setAnswer(targetData.answer);
  }, [liveQuestionQuery.data, nowQuestionIndex]);

  const handleQuestionType = () => {
    sendWrittenData(nowQuestionIndex);
    if (questionType === "MULTIPLE_CHOICE") {
      setQuestionType("ESSAY_QUESTION");
      return;
    }
    setQuestionType("MULTIPLE_CHOICE");
  };

  useEffect(() => {
    if (questionType === "ESSAY_QUESTION") {
      setAnswerExampleList([""]);
      return;
    }
    setAnswerExampleList(["", "", "", "", ""]);
  }, [questionType]);

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
              checked={questionType === "MULTIPLE_CHOICE"}
              onChange={handleQuestionType}
              defaultChecked
            />
          }
          label={questionType === "MULTIPLE_CHOICE" ? "객관식" : "주관식"}
        />
      </Box>
      <FormControl variant="filled" sx={{ mb: 4, pl: 1, pr: 1 }}>
        <InputLabel sx={{ pl: 2 }}>문제 본문</InputLabel>
        <OutlinedInput
          multiline
          rows={5}
          value={questionText}
          // onChange={handleQuestionTextChange}
          // onFocus={(e) => {}}
          sx={{ pt: 3 }}
        />
        <FormHelperText sx={{ position: "absolute", bottom: -22 }}>
          {/* 미도리님이 작성중입니다 */}
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
                {questionType === "MULTIPLE_CHOICE"
                  ? `보기 ${index + 1}`
                  : "주관식"}
              </Typography>
              <OutlinedInput
                size="small"
                value={ele}
                // onChange={handleAnswerExampleChange(index)}
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
          // onChange={handleQuestionTextChange}
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
            // onChange={handleAnswerExampleChange}
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
