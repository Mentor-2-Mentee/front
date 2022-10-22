import { Box, SxProps, Typography } from "@mui/material";
import { SignatureColor } from "../commonStyles/CommonColor";
import { ExamQuestion } from "../hooks/queries/examReviewRoom";
import { Question } from "../hooks/queries/questionPost";

interface QuestionViewProps {
  question: Question | ExamQuestion;
  headText?: string;
}

export const QuestionView = ({
  question,
  headText = "문제 내용",
}: QuestionViewProps) => {
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
          {question.questionType === "MULTIPLE_CHOICE" ? "객관식" : "주관식"}
        </Typography>
      </Box>

      <Box sx={QuestionBodyBoxSxProps}>
        <div
          dangerouslySetInnerHTML={{ __html: question.questionText || "" }}
        />
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
