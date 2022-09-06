import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import ApiFetchEventHandler from "../../../../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { deleteExamSchedule } from "../../../../../hooks/queries/examSchedule/deleteExamSchedule";
import { ExamSchedule } from "../../../../../hooks/queries/examSchedule";
import { userGradeCheck } from "../../../../../utils/userGradeCheck";

interface AdminButtonProps {
  userGrade?: string;
  examSchedule: ExamSchedule;
}

export const AdminButton = ({
  userGrade,
  examSchedule,
}: AdminButtonProps): JSX.Element => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const examScheduleDelete = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    try {
      const response = await deleteExamSchedule({
        token: accessToken,
        examScheduleId: examSchedule.examScheduleId,
      });
      console.log("response", response);

      enqueueSnackbar(`시험일정이 삭제되었습니다. `, {
        variant: "success",
      });
      navigation("/exam-schedule");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("시험일정삭제에 실패했습니다.", { variant: "error" });
    }
  };

  const handleExamScheduleDelete = new ApiFetchEventHandler(
    examScheduleDelete,
    500
  );

  const debouncedHandleExamScheduleDelete = () => {
    handleExamScheduleDelete.debounce();
  };

  if (userGradeCheck(["master", "admin"], userGrade)) {
    return (
      <>
        {userGradeCheck(["master", "admin"], userGrade) ? (
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
                  `/create_exam-schedule?examScheduleId=${examSchedule.examScheduleId}&examDate=${examSchedule.examDate}`
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
                debouncedHandleExamScheduleDelete();
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
