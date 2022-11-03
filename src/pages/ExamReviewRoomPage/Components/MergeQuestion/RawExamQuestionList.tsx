import { Box } from "@mui/material";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { RawExamQuestion } from "../../../../hooks/queries/rawExamQuestion";

interface RawExamQuestionListProps {
  rawExamQuestionList: RawExamQuestion[];
}

const RawExamQuestionList = ({
  rawExamQuestionList,
}: RawExamQuestionListProps) => {
  return (
    <>
      {rawExamQuestionList.map((rawExamQuestion) => {
        return (
          <Box sx={{ flex: "0 0 30%", p: 1 }}>
            <QuestionView
              headText={`${rawExamQuestion.author.userName} 제출내용`}
              question={rawExamQuestion}
            />
          </Box>
        );
      })}
    </>
  );
};

export default RawExamQuestionList;
