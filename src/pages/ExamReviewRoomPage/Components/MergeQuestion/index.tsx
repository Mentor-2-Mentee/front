import {
  Box,
  Button,
  Collapse,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import ExamQuestionList from "./ExamQuestionList";
import ExamQuestionComment from "./ExamQuestionComment";
import SelectedQuestionInfo from "./SelectedQuestionInfo";
import { ExamQuestion } from "../../../../hooks/queries/examQuestion";
import { QuestionView } from "../../../../commonElements/QuestionView";
import RawExamQuestionList from "./RawExamQuestionList";

const QUESTION_LIST_EXPOSE_HEIGHT = 340;
const QUESTION_LIST_HIDE_HEIGHT = 150;

interface MergeQuestionProps {
  examQuestionList: ExamQuestion[];
}

export const MergeQuestion = ({ examQuestionList }: MergeQuestionProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [selectedQuestionIndex, setSeletedQuestionIndex] = useState<number>(0);
  const [collapseIn, setCollapseIn] = useState<boolean>(true);
  const bodyTagRef = useRef<HTMLBodyElement>(document.querySelector("body"));

  const preventBodyScroll = useCallback(() => {
    if (!bodyTagRef.current) return;

    if (isWidthShort) {
      bodyTagRef.current.style.maxHeight = `unset`;
      bodyTagRef.current.style.maxWidth = `calc((var(--vw, 1vw) * 100))`;
      bodyTagRef.current.style.overflowX = "hidden";
    } else {
      bodyTagRef.current.style.maxHeight = `calc((var(--vh, 1vh) * 100))`;
      bodyTagRef.current.style.overflow = "hidden";
    }
  }, [bodyTagRef.current, isWidthShort]);

  const enableBodyScroll = useCallback(() => {
    if (!bodyTagRef.current) return;
    bodyTagRef.current.style.maxHeight = `unset`;
    bodyTagRef.current.style.overflow = "unset";
  }, [bodyTagRef.current, isWidthShort]);

  useEffect(() => {
    preventBodyScroll();
    window.addEventListener("resize", preventBodyScroll);
    return () => {
      enableBodyScroll();
      window.removeEventListener("resize", preventBodyScroll);
    };
  }, [preventBodyScroll]);

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
    // height: QUESTION_LIST_HIDE_HEIGHT,
    overflow: "scroll",
  });

const CollapseSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    width: isWidthShort ? "calc((var(--vw, 1vw) * 100))" : "60%",
    height: isWidthShort
      ? "100%"
      : `calc((var(--vh, 1vh) * 100) - ${theme.spacing(17.5)})`,
    overflow: "scroll",

    borderRight: isWidthShort
      ? "unset"
      : `5px double ${SignatureColor.BLACK_50}`,
  });

const SelectedQuestionBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    width: isWidthShort ? "unset" : "40%",
    m: 1,
    overflow: isWidthShort ? "unset" : "scroll",
    borderTop: isWidthShort ? `5px double ${SignatureColor.BLACK_50}` : "unset",
    height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(20)})`,
  });

export default MergeQuestion;
