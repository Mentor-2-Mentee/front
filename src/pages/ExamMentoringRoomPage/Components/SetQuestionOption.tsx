import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { ExamQuestion } from "../../../hooks/queries/examMentoringRoom";

interface SetQuestionOptionProps {
  examQuestionList: ExamQuestion[];
  sendChangeQuestionCount: (currentCount: number, newCount: number) => void;
  sendDeleteQuestion: (examQuestionId: number) => void;
}

export const SetQuestionOption = ({
  examQuestionList,
  sendChangeQuestionCount,
  sendDeleteQuestion,
}: SetQuestionOptionProps) => {
  const [questionCount, setQuestionCount] = useState<string | number>(
    examQuestionList.length
  );

  const handleQuestionCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionCount(event.target.value);
  };

  const submitNewQuestionCount = () => {
    if (isNaN(Number(questionCount))) {
      alert("숫자만 입력해주세요");
    }
    sendChangeQuestionCount(examQuestionList.length, Number(questionCount));
  };

  const submitDeleteQuestion = (examQuestionId: number) => () => {
    sendDeleteQuestion(examQuestionId);
  };

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        overflow: "scroll",
        height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)} )`,
      })}
    >
      <Typography variant="h5">문제 세부 설정</Typography>
      <Typography variant="subtitle1">{`현재 총 문제수 : ${examQuestionList.length}`}</Typography>
      <TextField
        size="small"
        value={questionCount}
        onChange={handleQuestionCount}
      />
      <Button onClick={submitNewQuestionCount}>전체 문제수 수정하기</Button>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        현재 문제수 이하로 조정시 맨 뒤의 문제부터 삭제됩니다.
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        삭제된 문제는 복구할 수 없습니다. 주의해주세요.
      </Typography>
      <>
        {examQuestionList.map((examQuestion, index) => {
          return (
            <Box sx={{ mb: 1, display: "flex" }}>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2, mt: 3, mb: 3 }}
                onClick={submitDeleteQuestion(examQuestion.examQuestionId)}
              >
                삭제
              </Button>
              <Box>
                <Typography variant="subtitle2">{`${
                  index + 1
                } 번 문제`}</Typography>
                <Typography variant="subtitle2">{`문제 본문 : ${examQuestion.questionText}`}</Typography>
                <Typography variant="subtitle2">{`문제 형식 : ${
                  examQuestion.questionType === "MULTIPLE_CHOICE"
                    ? "객관식"
                    : "주관식"
                }`}</Typography>
              </Box>
            </Box>
          );
        })}
      </>
    </Box>
  );
};

export default SetQuestionOption;
