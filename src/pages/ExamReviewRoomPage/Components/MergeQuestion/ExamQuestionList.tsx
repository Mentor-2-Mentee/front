import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { ExamQuestion } from "../../../../hooks/queries/examQuestion";

interface ExamQuestionListProps {
  examQuestonList: ExamQuestion[];
  dispatchSelectIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ExamQuestionList = ({
  examQuestonList,
  dispatchSelectIndex,
}: ExamQuestionListProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const handleExamQuestionClick = (index: number) => () => {
    dispatchSelectIndex(index);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: isWidthShort ? "row" : "unset",
        flexWrap: isWidthShort ? "unset" : "wrap",
        overflow: "scroll",
      }}
    >
      {examQuestonList.map((examQuestion, index) => {
        const submittedCount = examQuestion.rawExamQuestionId.length;
        const commentCount = examQuestion.commentId.length;
        return (
          <Box
            onClick={handleExamQuestionClick(index)}
            sx={{ flex: "0 0 30%", p: 1 }}
          >
            <Box sx={{ display: "flex" }}>
              <Button>{`제출 [${submittedCount}]`}</Button>
              <Button>{`댓글 [${commentCount}]`}</Button>
            </Box>
            <QuestionView
              question={examQuestion}
              headText={`${index + 1}번 문제`}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ExamQuestionList;
