import {
  Box,
  Collapse,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { ExamQuestion } from "../../../../hooks/queries/examReviewRoom";

interface ExamQuestionListProps {
  examQuestonList: ExamQuestion[];
  useSeletedQuestionIndexState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
}

export const ExamQuestionList = ({
  examQuestonList,
  useSeletedQuestionIndexState,
}: ExamQuestionListProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [selectedQuestionIndex, setSeletedQuestionIndex] =
    useSeletedQuestionIndexState;

  const handleExamQuestionClick = (index: number) => () => {
    setSeletedQuestionIndex(index);
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
