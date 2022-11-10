import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { QuestionEditer } from "../../../commonElements/QuestionEditer";
import { ExamQuestion } from "../../../hooks/queries/examQuestion";
import { usePostRawExamQuestionMutation } from "../../../hooks/queries/rawExamQuestion/usePostRawExamQuestionMutation";
import { getCookieValue } from "../../../utils";

interface SubmitQuestionProps {
  examReviewRoomId: number;
  examQuestionList: ExamQuestion[];
}

export const SubmitQuestion = ({
  examReviewRoomId,
  examQuestionList,
}: SubmitQuestionProps) => {
  const [examQuestionId, setExamQuestionId] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postRawExamQuestionMutate } = usePostRawExamQuestionMutation(
    examReviewRoomId,
    enqueueSnackbar
  );

  const handleIndexChange = (event: SelectChangeEvent) => {
    setExamQuestionId(Number(event.target.value));
  };

  const handleSubmitRawExamQuestion = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postRawExamQuestionMutate({
      token,
      rawExamQuestionForm: {
        examQuestionId,
        questionText,
        solution: null,
      },
    });
  }, [examReviewRoomId, examQuestionId, questionText]);

  const handleSubmitButton = () => handleSubmitRawExamQuestion();

  return (
    <Box sx={SubmitQuestionBoxSxProps}>
      <FormControl sx={{ mb: 1 }}>
        <InputLabel>문제번호</InputLabel>
        <Select
          value={String(examQuestionId)}
          label="문제번호"
          onChange={handleIndexChange}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
          }}
        >
          {examQuestionList.map((examQuestion, index) => {
            return (
              <MenuItem key={index} value={examQuestion.id}>{`${
                index + 1
              }번`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <QuestionEditer useTextState={[questionText, setQuestionText]} />

      <Button
        variant="contained"
        disabled={examQuestionId === 0 || questionText.trim().length === 0}
        onClick={handleSubmitButton}
        sx={{ mt: 1 }}
      >
        제출하기
      </Button>
    </Box>
  );
};

const SubmitQuestionBoxSxProps: SxProps = {
  display: "flex",
  flexFlow: "column",
  overflow: "scroll",
  p: 1,
};

export default SubmitQuestion;
