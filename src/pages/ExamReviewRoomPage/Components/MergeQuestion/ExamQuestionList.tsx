import { Box, Typography, useMediaQuery } from "@mui/material";
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
        const submittedCount = 2;
        const commentCount = 4;
        return (
          <Box
            onClick={handleExamQuestionClick(index)}
            sx={{ flex: "0 0 30%", p: 1 }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography>{`제출 [${submittedCount}]`}</Typography>
              <Typography>{`댓글 [${commentCount}]`}</Typography>
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
