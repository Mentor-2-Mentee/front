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
  const [editedQuestionForm, setEditedQuestionForm] =
    useState<Pick<ExamQuestion, "questionText" | "solution">>(selectedQuestion);
  const { enqueueSnackbar } = useSnackbar();
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [questionText, setQuestionText] = useState<string>("");
  const [solution, setSolution] = useState<string>("");

  const { mutate: updateExamQuestionMutate } = useUpdateExamQuestionMutation(
    selectedQuestion.id
  );

  useEffect(() => {
    setEditedQuestionForm((currentForm) => {
      return {
        ...currentForm,
        questionText,
        solution,
      };
    });
  }, [questionText, solution]);

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
        ...editedQuestionForm,
      },
    });
    console.log("saved!", editedQuestionForm);
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
        <>
          <QuestionEditer
            headText={`${selectedIndex + 1}번 문제`}
            useTextState={[questionText, setQuestionText]}
            height={isWidthShort ? 300 : 600}
          />
          <QuestionEditer
            headText={`${selectedIndex + 1}번 문제 답 & 풀이`}
            useTextState={[solution, setSolution]}
            height={isWidthShort ? 300 : 600}
          />
        </>
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
