import { Button } from "@mui/material";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { createTestMentoringRoomRequest } from "../../../../api/createTestMentoringRoomRequest";
import {
  testScheduleQueryClient,
  usePostTestMentoringRoomRequestMutation,
} from "../../../../hooks/queries/testSchedule";
import { useLocation } from "react-router";

interface CreateTestMentoringRoomRequestSubmitButtonProps {
  requestForm: {
    testField: string;
    testScheduleId: number;
  };
  useIsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const CreateTestMentoringRoomRequestSubmitButton = ({
  requestForm,
  useIsOpenState,
}: CreateTestMentoringRoomRequestSubmitButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useIsOpenState;
  const { enqueueSnackbar } = useSnackbar();

  const postTestMentoringRoomRequestForm =
    usePostTestMentoringRoomRequestMutation(requestForm.testScheduleId);

  return (
    <Button
      variant="contained"
      onClick={() => {
        const accessToken = getCookieValue("accessToken");
        if (accessToken === undefined) {
          enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
          return;
        }
        postTestMentoringRoomRequestForm.mutate({
          token: accessToken,
          testField: requestForm.testField,
          testScheduleId: requestForm.testScheduleId,
        });
        enqueueSnackbar(`${requestForm.testField} 생성신청 완료`, {
          variant: "success",
        });
        setIsOpen(false);
      }}
    >
      생성신청
    </Button>
  );
};

export default CreateTestMentoringRoomRequestSubmitButton;
