import {
  Box,
  Button,
  Collapse,
  IconButton,
  SxProps,
  TextField,
  Theme,
  Typography,
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

const QUESTION_LIST_EXPOSE_HEIGHT = 320;
const QUESTION_LIST_HIDE_HEIGHT = 100;

const TEST_COMMENTS = [
  { author: "ㅇㅇ(123.23)", comment: "12312314123", createdAt: "2022-05-12" },
  {
    author:
      "존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉",
    comment: "뻘소리",
    createdAt: "2022-05-12",
  },
  {
    author: "노멀한닉네임",
    comment:
      "뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리",
    createdAt: "2022-05-12",
  },
  {
    author:
      "존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉존나긴닉",
    comment:
      "뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리뻘소리",
    createdAt: "2022-05-12",
  },
];

export const QuestionGrid = ({ examQuestionList }: QuestionGridProps) => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [selectedQuestionIndex, setSeletedQuestionIndex] = useState<number>();
  const [questionListBoxExpose, setQuestionListBoxExpose] =
    useState<boolean>(true);

  const [autoCollapseDisable, setAutoCollapseDisable] =
    useState<boolean>(false);

  const [writeMode, setWriteMode] = useState<boolean>(false);

  const handleWriteModeButton = () => setWriteMode(true);
  const handleSaveButton = () => {
    alert("saved!");
    setWriteMode(false);
  };
  const handleWriteCancelButton = () => setWriteMode(false);

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
            <Box sx={{ mb: 2 }}>
              {writeMode ? (
                <>
                  <QuestionEditer
                    question={examQuestionList[selectedQuestionIndex]}
                    headText={`${selectedQuestionIndex + 1}번 문제`}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleWriteCancelButton}
                      sx={{ mr: 2 }}
                    >
                      취소하기
                    </Button>
                    <Button variant="contained" onClick={handleSaveButton}>
                      저장하기
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <QuestionView
                    question={examQuestionList[selectedQuestionIndex]}
                    headText={`${selectedQuestionIndex + 1}번 문제`}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button variant="contained" onClick={handleWriteModeButton}>
                      작성/수정하기
                    </Button>
                  </Box>
                </>
              )}
            </Box>

            <Box sx={CommentListBoxSxProps}>
              {TEST_COMMENTS.map(({ author, comment, createdAt }) => {
                return (
                  <Box sx={CommentElementBoxSxProps}>
                    <Typography variant="subtitle1" sx={CommentAuthorSxProps}>
                      {author}
                    </Typography>
                    <Typography variant="body1" maxWidth={"70%"}>
                      {comment}
                    </Typography>
                  </Box>
                );
              })}
              <Box sx={CommentInputBoxSxProps}>
                <Typography variant="subtitle1" sx={CommentAuthorSxProps}>
                  {"대충작성자닉"}
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  size="small"
                  variant="outlined"
                  sx={{ m: 1, width: "70%" }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}>
                <Button variant="contained">작성하기</Button>
              </Box>
            </Box>
          </>
        ) : (
          <div>선택된 문제 없음</div>
        )}
      </Box>
    </Box>
  );
};

const CommentListBoxSxProps: SxProps = {
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
  p: 2,
};

const CommentElementBoxSxProps: SxProps = {
  display: "flex",
  alignItems: "center",
  borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
  m: 1,
};

const CommentInputBoxSxProps: SxProps = {
  display: "flex",
  alignItems: "center",
  m: 1,
};

const CommentAuthorSxProps: SxProps = {
  mr: 1,
  width: 100,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

const SelectedQuestionBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    display: "flex",
    flexFlow: "column",
    width: `calc(100% - ${theme.spacing(2)})`,
    overflow: "scroll",
    borderTop: isWidthShort ? `1px solid ${SignatureColor.BLACK_80}` : "unset",
    p: 1,
  });

export default QuestionGrid;
