import { Box, SxProps, Typography } from "@mui/material";
import { SignatureColor } from "../commonStyles/CommonColor";

type Question = {
  questionText?: string;
  solution?: string;
};

interface QuestionViewProps {
  question: Question;
  headText?: string;
  additionalContent?: JSX.Element;
}

export const QuestionView = ({
  question,
  headText = "문제 내용",
  additionalContent,
}: QuestionViewProps) => {
  return (
    <Box sx={QuestionBoxSxProps}>
      <Box sx={QuestionHeaderBoxSxProps}>
        <Typography variant="subtitle1" fontWeight="bold">
          {headText}
        </Typography>
      </Box>

      <Box
        sx={QuestionBodyBoxSxProps}
        dangerouslySetInnerHTML={{ __html: question.questionText || "" }}
      />
      {additionalContent}
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
  // borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
  minHeight: 100,
};

const QuestionAnswerExampleBoxSxProps: SxProps = {
  mt: 1,
};
