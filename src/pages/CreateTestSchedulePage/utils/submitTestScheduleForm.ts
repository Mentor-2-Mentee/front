import { useSnackbar } from "notistack";
import {
  updateTestSchedule,
  UpdateTestScheduleParams,
} from "../../../hooks/queries/testSchedule/updateTestSchedule";
import { getCookieValue } from "../../../utils/handleCookieValue";
import { CreateTestSchedulePageMode } from "..";
import {
  createTestSchedule,
  CreateTestScheduleParams,
} from "../../../hooks/queries/testSchedule";
import { useNavigate } from "react-router";
import ApiFetchEventHandler from "../../../utils/ApiFetchEventHandler";

export interface SubmitTestScheduleFormConfig {
  mode: CreateTestSchedulePageMode;
  createParams: Omit<CreateTestScheduleParams, "token">;
  updateParams: Omit<UpdateTestScheduleParams, "token">;
}

export const submitTestScheduleForm = ({
  mode,
  createParams,
  updateParams,
}: SubmitTestScheduleFormConfig) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  return async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    try {
      if (mode === "CREATE") {
        const response = await createTestSchedule({
          token: accessToken,
          ...createParams,
        });
        enqueueSnackbar(`새 시험일정이 등록되었습니다. `, {
          variant: "success",
        });
        navigation(`/test-schedule#${response.data.testScheduleId}`);
      }
      if (mode === "UPDATE") {
        const response = await updateTestSchedule({
          token: accessToken,
          ...updateParams,
        });
        console.log(response);
        enqueueSnackbar(
          `${response.data.testScheduleTitle} 시험일정이 수정되었습니다. `,
          {
            variant: "success",
          }
        );
        navigation(`/test-schedule#${response.data.testScheduleId}`);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("시험일정 등록 또는 수정에 실패했습니다.", {
        variant: "error",
      });
    }
  };
};

export const debouncedSubmitTestScheduleForm = (
  config: SubmitTestScheduleFormConfig
) => {
  const handleSubmitTestScheduleForm = new ApiFetchEventHandler(
    submitTestScheduleForm(config),
    500
  );

  return () => handleSubmitTestScheduleForm.debounce();
};
