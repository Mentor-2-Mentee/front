import { Box, Collapse, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { ExamQuestion } from "../../../../hooks/queries/examReviewRoom";
import ExamQuestionList from "./ExamQuestionList";
import { QuestionComment } from "./QuestionComment";
import SelectedQuestionInfo from "./SelectedQuestionInfo";

const QUESTION_LIST_EXPOSE_HEIGHT = 340;
const QUESTION_LIST_HIDE_HEIGHT = 150;

interface MergeQuestionProps {
  examQuestionList: ExamQuestion[];
}

export const MergeQuestion = ({ examQuestionList }: MergeQuestionProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [selectedQuestionIndex, setSeletedQuestionIndex] = useState<number>(0);
  const [collapseIn, setCollapseIn] = useState<boolean>(true);

  return (
    <Box sx={MergeQuestionBoxSxProps(isWidthShort, collapseIn)}>
      <Collapse
        in={collapseIn}
        collapsedSize={QUESTION_LIST_HIDE_HEIGHT}
        sx={CollapseSxProps(isWidthShort)}
      >
        <ExamQuestionList examQuestonList={examQuestionList} />
      </Collapse>

      <Box sx={SelectedQuestionBoxSxProps(isWidthShort)}>
        <SelectedQuestionInfo
          selectedIndex={selectedQuestionIndex}
          selectedQuestion={examQuestionList[selectedQuestionIndex]}
        />
        <QuestionComment
          questionId={examQuestionList[selectedQuestionIndex].id}
        />
      </Box>
    </Box>
  );
};

const MergeQuestionBoxSxProps = (
  isWidthShort: boolean,
  collapseIn: boolean
): SxProps => ({
  display: isWidthShort ? "grid" : "flex",
  gridTemplateRows: collapseIn
    ? `${QUESTION_LIST_EXPOSE_HEIGHT}px calc(100% - ${QUESTION_LIST_EXPOSE_HEIGHT}px)`
    : `${QUESTION_LIST_HIDE_HEIGHT}px calc(100% - ${QUESTION_LIST_HIDE_HEIGHT}px)`,
  height: "100%",
});

const CollapseSxProps = (isWidthShort: boolean): SxProps => ({
  width: isWidthShort ? "unset" : "60%",
  overflow: "scroll",
  borderRight: isWidthShort ? "unset" : `5px double ${SignatureColor.BLACK_50}`,
});

const SelectedQuestionBoxSxProps = (isWidthShort: boolean): SxProps => ({
  width: isWidthShort ? "unset" : "40%",
  overflow: "scroll",
  borderTop: isWidthShort ? `5px double ${SignatureColor.BLACK_50}` : "unset",
  m: 1,
});

export default MergeQuestion;
