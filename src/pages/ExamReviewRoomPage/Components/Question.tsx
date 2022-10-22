import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Modal,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import ImageUpload, { ImageFile } from "../../../commonElements/ImageUpload";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import {
  ExamQuestion,
  QuestionType,
} from "../../../hooks/queries/examReviewRoom";

interface QuestionProps {
  useNowQuestionIndexState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
  nowQuestion: ExamQuestion;
  sendChangeData: (
    nowQuestionIndex: number,
    updateExamQuestionData: ExamQuestion
  ) => void;
}

export const Question = ({
  useNowQuestionIndexState,
  nowQuestion,
  sendChangeData,
}: QuestionProps) => {
  const [nowQuestionIndex, setNowQuestionIndex] = useNowQuestionIndexState;

  if (!nowQuestion) {
    setNowQuestionIndex(0);
    alert(`${nowQuestionIndex + 1}번 문제는 삭제됐습니다.`);
    return <>{null}</>;
  }

  const { examScheduleId, examType } = useParams();
  const [questionText, setQuestionText] = useState<string>("");
  const [answerExampleList, setAnswerExampleList] = useState<string[]>([""]);
  const [questionType, setQuestionType] =
    useState<QuestionType>("MULTIPLE_CHOICE");
  const [solution, setSolution] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [questionImageUrl, setQuestionImageUrl] = useState<string[]>([]);

  const [throttleTimer, setThrottleTimer] = useState<number | undefined>(
    undefined
  );

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
      const newAnswerExample = answerExampleList.concat();
      newAnswerExample[answerExampleIndex] = event.target.value;
      setAnswerExampleList(newAnswerExample);

      if (throttleTimer) return;
      const timer = window.setTimeout(() => {
        const newAnswerExample = answerExampleList.concat();
        newAnswerExample[answerExampleIndex] = event.target.value;
        sendChangeData(nowQuestionIndex, {
          ...nowQuestion,
          answerExample: newAnswerExample,
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
    setAnswerExampleList(nowQuestion.answerExample);
    setQuestionType(nowQuestion.questionType);
    setSolution(nowQuestion.solution);
    setAnswer(nowQuestion.answer);
  }, [nowQuestion]);

  const [open, setOpen] = useState(false);
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
      <FormControl variant="filled" sx={{ mb: 1, pl: 1, pr: 1 }}>
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

      <Box
        sx={{
          mb: 2,
          ml: 1,
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        {nowQuestion.questionImageUrl[0] ? (
          <img
            src={nowQuestion.questionImageUrl[0]}
            alt={`${nowQuestionIndex + 1}번 문제 이미지`}
            style={{
              width: "100%",
              maxWidth: 400,
            }}
          />
        ) : null}
        <Button onClick={handleOpen}>
          {nowQuestion.questionImageUrl[0]
            ? "문제 본문 이미지 수정"
            : "문제 본문 이미지 추가"}
        </Button>
        {nowQuestion.questionImageUrl[0] ? (
          <Button
            color="error"
            onClick={() => {
              sendChangeData(nowQuestionIndex, {
                ...nowQuestion,
                questionImageUrl: [],
              });
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
          </Box>
        </Modal>
      </Box>

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
