import { Box, Collapse, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import ExamQuestionList from "./ExamQuestionList";
import ExamQuestionComment from "./ExamQuestionComment";
import SelectedQuestionInfo from "./SelectedQuestionInfo";
import { ExamQuestion } from "../../../../hooks/queries/examQuestion";

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
        <ExamQuestionList
          examQuestonList={examQuestionList}
          dispatchSelectIndex={setSeletedQuestionIndex}
        />
      </Collapse>

      <Box sx={SelectedQuestionBoxSxProps(isWidthShort)}>
        <SelectedQuestionInfo
          selectedIndex={selectedQuestionIndex}
          selectedQuestion={examQuestionList[selectedQuestionIndex]}
        />
        <ExamQuestionComment
          examQuestionId={examQuestionList[selectedQuestionIndex].id}
        />
      </Box>
    </Box>
  );
};

const MergeQuestionBoxSxProps =
  (isWidthShort: boolean, collapseIn: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    display: isWidthShort ? "grid" : "flex",
    gridTemplateRows: collapseIn
      ? `${QUESTION_LIST_EXPOSE_HEIGHT}px calc(100% - ${QUESTION_LIST_EXPOSE_HEIGHT}px)`
      : `${QUESTION_LIST_HIDE_HEIGHT}px calc(100% - ${QUESTION_LIST_HIDE_HEIGHT}px)`,
    height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(18)})`,
  });

const CollapseSxProps = (isWidthShort: boolean): SxProps => ({
  width: isWidthShort ? "unset" : "60%",
  overflow: "scroll",
  borderRight: isWidthShort ? "unset" : `5px double ${SignatureColor.BLACK_50}`,
});

const SelectedQuestionBoxSxProps = (isWidthShort: boolean): SxProps => ({
  width: isWidthShort ? "unset" : "40%",
  overflow: isWidthShort ? "unset" : "scroll",
  borderTop: isWidthShort ? `5px double ${SignatureColor.BLACK_50}` : "unset",
  m: 1,
});

export default MergeQuestion;
