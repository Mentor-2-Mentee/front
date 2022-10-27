import { Box, Button, SxProps } from "@mui/material";
import { useState } from "react";
import { QuestionEditer } from "../../../../commonElements/QuestionEditer";
import { QuestionView } from "../../../../commonElements/QuestionView";
import { ExamQuestion } from "../../../../hooks/queries/examReviewRoom";

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
  const handleEditModeButton = () => setMode("edit");
  const handleEditCancelButton = () => setMode("view");
  const handleSaveButton = () => {
    alert("saved!");
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
        <QuestionEditer
          question={selectedQuestion}
          headText={`${selectedIndex + 1}번 문제`}
        />
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
