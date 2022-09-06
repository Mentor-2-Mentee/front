import { Button } from "@mui/material";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { createExamMentoringRoomRequest } from "../../../../api/createExamMentoringRoomRequest";
import {
  examScheduleQueryClient,
  usePostExamMentoringRoomRequestMutation,
} from "../../../../hooks/queries/examSchedule";
import { useLocation } from "react-router";

interface CreateExamMentoringRoomRequestSubmitButtonProps {
  requestForm: {
    examField: string;
    examScheduleId: number;
  };
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateExamMentoringRoomRequestSubmitButton = ({
  requestForm,
  useIsOpenState,
}: CreateExamMentoringRoomRequestSubmitButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const { enqueueSnackbar } = useSnackbar();

  const postExamMentoringRoomRequestForm =
    usePostExamMentoringRoomRequestMutation(requestForm.examScheduleId);

  return (
    <Button
      variant="contained"
      onClick={() => {
        const accessToken = getCookieValue("accessToken");
        if (accessToken === undefined) {
          enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
          return;
        }
        postExamMentoringRoomRequestForm.mutate({
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

export default CreateExamMentoringRoomRequestSubmitButton;
