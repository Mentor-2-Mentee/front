import { Button } from "@mui/material";
import { getCookieValue } from "../../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";
import { createTestMentoringRoomRequest } from "../../../../api/createTestMentoringRoomRequest";
import { testScheduleQueryClient } from "../../../../hooks/queries/testSchedule";

interface CreateTestMentoringRoomRequestSubmitButtonProps {
  requestForm: {
    requestWorkField: string;
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
  const submitCreateTestMentoringRoomRequestForm = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    const params = {
      token: accessToken,
      ...requestForm,
    };

    if (params.requestWorkField === "") {
      enqueueSnackbar("직군을 선택, 또는 입력해야합니다.", {
        variant: "warning",
      });
      return;
    }

    try {
      const response = await createTestMentoringRoomRequest(params);
      enqueueSnackbar(`${params.requestWorkField} 생성신청 완료`, {
        variant: "success",
      });
      testScheduleQueryClient.invalidateQueries([
        "createTestMentoringRoomRequest",
      ]);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${params.requestWorkField} 생성신청 실패`, {
        variant: "error",
      });
    }
  };

  const handleSubmitButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    submitCreateTestMentoringRoomRequestForm();
  };

  return (
    <Button variant="contained" onClick={handleSubmitButton}>
      생성신청
    </Button>
  );
};

export default CreateTestMentoringRoomRequestSubmitButton;
