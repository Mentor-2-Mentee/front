import { Button } from "@mui/material";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { usePostExamReviewRoomRequestMutation } from "../../../../hooks/queries/examReviewRoom";

interface CreateExamReviewRoomRequestSubmitButtonProps {
  requestForm: {
    examField: string;
    examScheduleId: number;
  };
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateExamReviewRoomRequestSubmitButton = ({
  requestForm,
  useIsOpenState,
}: CreateExamReviewRoomRequestSubmitButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const { enqueueSnackbar } = useSnackbar();

  const postExamReviewRoomRequestForm = usePostExamReviewRoomRequestMutation(
    requestForm.examScheduleId
  );

  return (
    <Button
      variant="contained"
      onClick={() => {
        const accessToken = getCookieValue("accessToken");
        if (accessToken === undefined) {
          enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
          return;
        }
        postExamReviewRoomRequestForm.mutate({
          token: accessToken,
          examField: requestForm.examField,
          examScheduleId: requestForm.examScheduleId,
        });
        enqueueSnackbar(`${requestForm.examField} 생성신청 완료`, {
          variant: "success",
        });
        setIsOpen(false);
      }}
    >
      생성신청
    </Button>
  );
};

export default CreateExamReviewRoomRequestSubmitButton;
