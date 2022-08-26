import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import ApiFetchEventHandler from "../../../../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { deleteTestSchedule } from "../../../../../hooks/queries/testSchedule/deleteTestSchedule";
import { TestSchedule } from "../../../../../hooks/queries/testSchedule";

interface AdminButtonProps {
  userGrade?: string;
  testSchedule: TestSchedule;
}

export const AdminButton = ({
  userGrade,
  testSchedule,
}: AdminButtonProps): JSX.Element => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const testScheduleDelete = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    try {
      const response = await deleteTestSchedule({
        token: accessToken,
        testScheduleId: testSchedule.testScheduleId,
      });
      console.log("response", response);

      enqueueSnackbar(`시험일정이 삭제되었습니다. `, {
        variant: "success",
      });
      navigation("/test-schedule");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("시험일정삭제에 실패했습니다.", { variant: "error" });
    }
  };

  const handleTestScheduleDelete = new ApiFetchEventHandler(
    testScheduleDelete,
    500
  );

  const debouncedHandleTestScheduleDelete = () => {
    handleTestScheduleDelete.debounce();
  };

  if (userGrade === "master") {
    return (
      <>
        {userGrade === "master" ? (
          <Box
            sx={(theme) => ({
              display: "flex",
              ml: "auto",
            })}
          >
            <Button
              variant="text"
              size="small"
              color="warning"
              onClick={() => {
                navigation(
                  `/create_test-schedule?testScheduleId=${testSchedule.testScheduleId}&testDate=${testSchedule.testDate}`
                );
              }}
            >
              시험일정 수정
            </Button>
            <Button
              variant="text"
              size="small"
              color="error"
              sx={(theme) => ({ ml: theme.spacing(2) })}
              onClick={() => {
                debouncedHandleTestScheduleDelete();
              }}
            >
              시험일정 삭제
            </Button>
          </Box>
        ) : null}
      </>
    );
  }

  return <>{null}</>;
};

export default AdminButton;
