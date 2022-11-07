import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { ExamQuestion } from "../../../../hooks/queries/examQuestion";
import { RawExamQuestion } from "../../../../hooks/queries/rawExamQuestion";
import RawExamQuestionList from "./RawExamQuestionList";

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
  const [seletedQuestionId, setSeletedQuestionId] = useState<
    number | undefined
  >(undefined);
  const [seletedQuestionIndex, setSeletedQuestionIndex] = useState<number>(0);

  const [rawExamQuestionList, setRawExamQuestionList] = useState<
    RawExamQuestion[]
  >([]);

  useEffect(() => {
    const targetIndex = examQuestonList.findIndex(
      (examQuestion) => examQuestion.id === seletedQuestionId
    );
    if (targetIndex === -1) return;
    setRawExamQuestionList(examQuestonList[targetIndex].rawExamQuestionList);
    setSeletedQuestionIndex(targetIndex);
  }, [examQuestonList, seletedQuestionId]);

  return (
    <>
      {seletedQuestionId === undefined ? null : (
        <>
          <Button
            onClick={() => {
              setSeletedQuestionId(undefined);
            }}
          >
            추합된 문제들 보기
          </Button>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            sx={{ ml: 2 }}
          >{`${seletedQuestionIndex + 1}번 문제 제출내용`}</Typography>
        </>
      )}
      <Box
        sx={(theme) => ({
          // height: "100%",
          // height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(18)})`,
          // display: "flex",
          // flexDirection: isWidthShort ? "row" : "unset",
          // flexWrap: isWidthShort ? "unset" : "wrap",
          // flexWrap: "wrap",
          // overflow: "scroll",
        })}
      >
        {seletedQuestionId === undefined ? (
          examQuestonList.map((examQuestion, index) => {
            return (
              <Box
                onClick={handleExamQuestionClick(index)}
                sx={{ flex: "0 0 30%", p: 1 }}
              >
                <Box sx={{ display: "flex" }}>
                  <Button>{`댓글 [${examQuestion.examQuestionCommentList.length}]`}</Button>
                  <Button
                    onClick={() => {
                      setSeletedQuestionId(examQuestion.id);
                    }}
                  >{`제출된 문제 확인 [${examQuestion.rawExamQuestionList.length}]`}</Button>
                </Box>

                <QuestionView
                  question={examQuestion}
                  headText={`${index + 1}번 문제`}
                />
              </Box>
            );
          })
        ) : (
          <>
            <RawExamQuestionList rawExamQuestionList={rawExamQuestionList} />
          </>
        )}
      </Box>
    </>
  );
};

export default ExamQuestionList;
