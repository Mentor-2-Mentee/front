import { useSnackbar } from "notistack";
import {
  updateExamSchedule,
  UpdateExamScheduleParams,
} from "../../../hooks/queries/examSchedule/updateExamSchedule";
import { getCookieValue } from "../../../utils/handleCookieValue";
import {
  createExamSchedule,
  CreateExamScheduleParams,
} from "../../../hooks/queries/examSchedule";
import { useNavigate } from "react-router";
import ApiFetchEventHandler from "../../../utils/ApiFetchEventHandler";

export interface SubmitExamScheduleFormConfig {
  isUpdate: boolean;
  createParams: Omit<CreateExamScheduleParams, "token">;
  updateParams: Omit<UpdateExamScheduleParams, "token">;
}

export const submitExamScheduleForm = ({
  isUpdate,
  createParams,
  updateParams,
}: SubmitExamScheduleFormConfig) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  return async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    try {
      if (!isUpdate) {
        const response = await createExamSchedule({
          token: accessToken,
          ...createParams,
        });
        enqueueSnackbar(`새 시험일정이 등록되었습니다. `, {
          variant: "success",
        });
        navigation(`/exam-schedule#${response.data.examScheduleId}`);
      }
      if (isUpdate) {
        const response = await updateExamSchedule({
          token: accessToken,
          ...updateParams,
        });
        console.log(response);
        enqueueSnackbar(
          `${response.data.examScheduleTitle} 시험일정이 수정되었습니다. `,
          {
            variant: "success",
          }
        );
        navigation(`/exam-schedule#${response.data.examScheduleId}`);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("시험일정 등록 또는 수정에 실패했습니다.", {
        variant: "error",
      });
    }
  };
};

export const debouncedSubmitExamScheduleForm = (
  config: SubmitExamScheduleFormConfig
) => {
  const handleSubmitExamScheduleForm = new ApiFetchEventHandler(
    submitExamScheduleForm(config),
    500
  );

  return () => handleSubmitExamScheduleForm.debounce();
};
