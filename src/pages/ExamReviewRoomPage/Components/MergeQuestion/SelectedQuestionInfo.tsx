import { Box, Button, SxProps, useMediaQuery } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { QuestionEditer } from "../../../../commonElements/QuestionEditer";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { ExamQuestion } from "../../../../hooks/queries/examQuestion";
import { useUpdateExamQuestionMutation } from "../../../../hooks/queries/examQuestion/useUpdateExamQuestionMutation";
import { getCookieValue } from "../../../../utils";

interface SelectedQuestionInfoProps {
  selectedIndex: number;
  selectedQuestion: ExamQuestion;
}

type Mode = "view" | "edit";

export const SelectedQuestionInfo = ({
  selectedIndex,
  selectedQuestion,
}: SelectedQuestionInfoProps) => {
  const [mode, setMode] = useState<Mode>("view");
  const [currentIndex, setCurrentIndex] = useState<number>(selectedIndex);
  const [questionText, setQuestionText] = useState<string>(
    selectedQuestion.questionText
  );
  const [solution, setSolution] = useState<string>(selectedQuestion.solution);
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateExamQuestionMutate } = useUpdateExamQuestionMutation(
    selectedQuestion.id
  );

  useEffect(() => {
    if (mode === "edit" && currentIndex !== selectedIndex) {
      const isMove = confirm(
        "다른문제로 이동시 현재 작성된 내용은 사라집니다."
      );
      if (!isMove) return;
    }
    setMode("view");
    setQuestionText(selectedQuestion.questionText);
    setSolution(selectedQuestion.solution);
  }, [selectedIndex, currentIndex]);

  const handleEditModeButton = () => setMode("edit");
  const handleEditCancelButton = () => setMode("view");
  const handleSaveButton = () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    updateExamQuestionMutate({
      token,
      examQuestionForm: {
        id: selectedQuestion.id,
        questionText,
        solution,
      },
    });
    setMode("view");
  };

  return (
    <>
      {mode === "view" ? (
        <QuestionView
          question={selectedQuestion}
          headText={`${selectedIndex + 1}번 문제`}
        />
      ) : (
        <Box sx={{ "& > div": { mb: 1 } }}>
          <QuestionEditer
            headText={`${selectedIndex + 1}번 문제`}
            useTextState={[questionText, setQuestionText]}
          />
          <QuestionEditer
            headText={`${selectedIndex + 1}번 문제 답 & 풀이`}
            useTextState={[solution, setSolution]}
            initialOpen={false}
          />
        </Box>
      )}
      {mode === "view" ? (
        <Box sx={HandlerBoxSxProps}>
          <Button variant="contained" onClick={handleEditModeButton}>
            작성/수정하기
          </Button>
        </Box>
      ) : (
        <Box sx={HandlerBoxSxProps}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleEditCancelButton}
            sx={{ mr: 2 }}
          >
            취소하기
          </Button>
          <Button variant="contained" onClick={handleSaveButton}>
            저장하기
          </Button>
        </Box>
      )}
    </>
  );
};

const HandlerBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
};

export default SelectedQuestionInfo;
