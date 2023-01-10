import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { usePostExamQuestionBulkCreateMutation } from "../../../../hooks/queries/examQuestion/usePostExamQuestionBulkCreateMutation";
import { getCookieValue } from "../../../../utils";

interface SetExamQuestionCountProps {
  currentQuestionCount: number;
  examReviewRoomId: number;
}

export const SetExamQuestionCount = ({
  currentQuestionCount,
  examReviewRoomId,
}: SetExamQuestionCountProps) => {
  const [questionCount, setQuestionCount] =
    useState<number>(currentQuestionCount);
  const handleQuestionCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionCount(Number(event.target.value));
  };
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: postExamQuestionBulkCreateMutate } =
    usePostExamQuestionBulkCreateMutation(enqueueSnackbar);

  const handleSubmitButton = () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postExamQuestionBulkCreateMutate({
      token,
      examReviewRoomId,
      examQuestionCount: questionCount,
    });
  };
  return (
    <Box sx={OptionBoxSxProps}>
      <Typography variant="h5">전체 문제수 설정 (관리자)</Typography>
      <Typography variant="subtitle1">{`현재 총 문제수 : ${currentQuestionCount}`}</Typography>
      <TextField
        size="small"
        type={"number"}
        value={questionCount}
        onChange={handleQuestionCountChange}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" size="small" onClick={handleSubmitButton}>
        전체 문제수 수정하기
      </Button>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        현재 문제수 이하로 조정시 맨 뒤의 문제부터 삭제됩니다.
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        삭제된 문제는 복구할 수 없습니다. 주의해주세요.
      </Typography>
    </Box>
  );
};

const OptionBoxSxProps: SxProps = {
  p: 2,
};

export default SetExamQuestionCount;
