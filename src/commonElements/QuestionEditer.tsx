import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { useState } from "react";
import { SignatureColor } from "../commonStyles/CommonColor";
import { ExamQuestion } from "../hooks/queries/examReviewRoom";
import { Question } from "../hooks/queries/questionPost";
import PostEditer from "./PostEditer";

interface QuestionEditerProps {
  question: Question | ExamQuestion;
  headText?: string;
}

export const QuestionEditer = ({
  question,
  headText = "문제 내용",
}: QuestionEditerProps) => {
  const [questionText, setQuestionText] = useState<string>("");

  return (
    <Box sx={QuestionBoxSxProps}>
      <Box sx={QuestionHeaderBoxSxProps}>
        <Typography variant="subtitle1" fontWeight="bold">
          {headText}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color={SignatureColor.BLUE}
        >
          {question.questionType}
        </Typography>
      </Box>

      <Box sx={QuestionBodyBoxSxProps}>
        <PostEditer usePostState={[questionText, setQuestionText]} />
        {question.questionImageUrl.map((url) => {
          return <img key={url} src={url} alt={url} />;
        })}
      </Box>

      <Box sx={QuestionAnswerExampleBoxSxProps}>
        {question.answerExample.map((example, index) => {
          return (
            <Typography key={`${example}_${index}`}>{`${
              index + 1
            }. ${example}`}</Typography>
          );
        })}
      </Box>
    </Box>
  );
};

const QuestionBoxSxProps: SxProps = {
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
  display: "flex",
  flexFlow: "column",
  minWidth: 300,
  margin: "10px auto 10px",
  p: 1,
};

const QuestionHeaderBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
};

const QuestionBodyBoxSxProps: SxProps = {
  mt: 1,
  borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
  minHeight: 100,
};

const QuestionAnswerExampleBoxSxProps: SxProps = {
  mt: 1,
};
