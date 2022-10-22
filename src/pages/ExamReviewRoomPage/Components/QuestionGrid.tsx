import {
  Box,
  Button,
  Collapse,
  IconButton,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { QuestionEditer } from "../../../commonElements/QuestionEditer";
import { QuestionView } from "../../../commonElements/QuestionView";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { ExamQuestion } from "../../../hooks/queries/examReviewRoom";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface QuestionGridProps {
  examQuestionList: ExamQuestion[];
}

const QUESTION_LIST_EXPOSE_HEIGHT = 300;
const QUESTION_LIST_HIDE_HEIGHT = 100;

export const QuestionGrid = ({ examQuestionList }: QuestionGridProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [selectedQuestionIndex, setSeletedQuestionIndex] = useState<number>();
  const [questionListBoxExpose, setQuestionListBoxExpose] =
    useState<boolean>(true);

  const [autoCollapseDisable, setAutoCollapseDisable] =
    useState<boolean>(false);

  const handleQuestionClick = (questionIndex: number) => () => {
    setSeletedQuestionIndex(questionIndex);
  };

  const handleQuestionListHeightByScroll = () => {
    setAutoCollapseDisable(true);
    setQuestionListBoxExpose(!questionListBoxExpose);
  };

  return (
    <Box sx={QuestionGridBoxSxProps(isWidthShort, questionListBoxExpose)}>
      <Collapse
        in={questionListBoxExpose}
        collapsedSize={QUESTION_LIST_HIDE_HEIGHT}
      >
        <Box sx={QuestionListBoxSxProps(isWidthShort)}>
          {examQuestionList.map((question, index) => {
            return (
              <Box onClick={handleQuestionClick(index)}>
                <QuestionView
                  key={question.id}
                  question={question}
                  headText={`${index + 1}번 문제`}
                />
              </Box>
            );
          })}
        </Box>
      </Collapse>

      <Box
        sx={SelectedQuestionBoxSxProps(isWidthShort)}
        onScroll={(e) => {
          if (isWidthShort && !autoCollapseDisable) {
            setQuestionListBoxExpose(false);
          }
        }}
      >
        {isWidthShort ? (
          <IconButton onClick={handleQuestionListHeightByScroll}>
            {questionListBoxExpose ? (
              <KeyboardDoubleArrowUpIcon sx={{ fontSize: 30 }} />
            ) : (
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: 30 }} />
            )}
          </IconButton>
        ) : null}
        {selectedQuestionIndex !== undefined ? (
          <>
            <QuestionView
              question={examQuestionList[selectedQuestionIndex]}
              headText={`${selectedQuestionIndex + 1}번 문제`}
            />
            <QuestionEditer
              question={examQuestionList[selectedQuestionIndex]}
              headText={`${selectedQuestionIndex + 1}번 문제`}
            />
            <Box>
              <div>댓글1</div>
              <div>댓글2</div>
              <div>댓글3</div>
              <div>댓글4</div>
              <div>댓글1</div>
              <div>댓글2</div>
              <div>댓글3</div>
              <div>댓글4</div>
              <div>댓글1</div>
              <div>댓글2</div>
              <div>댓글3</div>
              <div>댓글4</div>
              <div>댓글1</div>
              <div>댓글2</div>
              <div>댓글3</div>
              <div>댓글4</div>
              <div>댓글1</div>
              <div>댓글2</div>
              <div>댓글3</div>
              <div>댓글4</div>
            </Box>
          </>
        ) : (
          <div>선택된 문제 없음</div>
        )}
      </Box>
    </Box>
  );
};

const QuestionGridBoxSxProps =
  (isWidthShort: boolean, questionListBoxExpose: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    display: isWidthShort ? "grid" : "flex",
    gridTemplateRows: questionListBoxExpose
      ? `${QUESTION_LIST_EXPOSE_HEIGHT}px calc(100% - ${QUESTION_LIST_EXPOSE_HEIGHT}px)`
      : `${QUESTION_LIST_HIDE_HEIGHT}px calc(100% - ${QUESTION_LIST_HIDE_HEIGHT}px)`,
    height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)})`,
  });

const QuestionListBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    display: "flex",
    flexDirection: isWidthShort ? "row" : "unset",
    flexWrap: isWidthShort ? "unset" : "wrap",
    overflow: "scroll",
    width: isWidthShort ? "100vw" : "unset",
    height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)})`,
    borderRight: isWidthShort
      ? "unset"
      : `1px solid ${SignatureColor.BLACK_80}`,

    "& > *": {
      flex: "1 0 30%",
      p: 1,
    },
  });

const SelectedQuestionBoxSxProps = (isWidthShort: boolean): SxProps => ({
  display: "flex",
  flexFlow: "column",
  width: "100%",
  overflow: "scroll",
  borderTop: isWidthShort ? `1px solid ${SignatureColor.BLACK_80}` : "unset",
  m: 2,
});

export default QuestionGrid;
