import { Button } from "@mui/material";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostExamReviewRoomRequestMutation } from "../../../../hooks/queries/examReviewRoom";
import { Box } from "@mui/system";

interface SubmitButtonProps {
  requestForm: {
    examType: string;
    examScheduleId: number;
  };

  dispatcher: (nowOpen: boolean) => void;
}

export const SubmitButton = ({
  requestForm,
  dispatcher: IsOpenDispatcher,
}: SubmitButtonProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const { examType, examScheduleId } = requestForm;
  const postExamReviewRoomRequestForm = usePostExamReviewRoomRequestMutation(
    examScheduleId,
    enqueueSnackbar,
    IsOpenDispatcher
  );

  const handleSubmitButton = (isParticipant: boolean) => () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    postExamReviewRoomRequestForm.mutate({
      token,
      examType,
      examScheduleId,
      isParticipant,
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmitButton(false)}
      >
        생성신청 (미응시자)
      </Button>
      <Button variant="contained" onClick={handleSubmitButton(true)}>
        생성신청 (응시자)
      </Button>
    </Box>
  );
};

export default SubmitButton;
