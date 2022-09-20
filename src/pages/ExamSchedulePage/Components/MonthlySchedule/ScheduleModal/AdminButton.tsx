import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { getCookieValue } from "../../../../../utils/handleCookieValue";
import { ExamSchedule } from "../../../../../hooks/queries/examSchedule";
import { userGradeCheck } from "../../../../../utils/userGradeCheck";
import { useDeleteExamScheduleMutation } from "../../../../../hooks/queries/examSchedule/useDeleteExamScheduleMutation";
import { useCallback } from "react";

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

  const deleteExamScheduleMutation = useDeleteExamScheduleMutation(
    navigation,
    enqueueSnackbar
  );

  const submitExamScheduleDelete = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    deleteExamScheduleMutation.mutate({
      token,
      examScheduleId: examSchedule.examScheduleId,
    });
  }, [examSchedule]);

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
                  `/create_exam-schedule?update=true&examScheduleId=${examSchedule.examScheduleId}`
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
              onClick={submitExamScheduleDelete}
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
