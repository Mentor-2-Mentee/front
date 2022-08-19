import {
  createMentoringRoom,
  CreateMentoringRoomParams,
} from "../../../api/createMentoringRoom";
import ApiFetchEventHandler from "../../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../../utils/handleCookieValue";
import { useSnackbar } from "notistack";

interface SubmitMentoringRoomFormConfig {
  params: Omit<CreateMentoringRoomParams, "token">;
  setCreatedURL: React.Dispatch<React.SetStateAction<string>>;
}

const submitMentoringRoomForm = ({
  params,
  setCreatedURL,
}: SubmitMentoringRoomFormConfig) => {
  const { enqueueSnackbar } = useSnackbar();
  return async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    if (params.mentoringRoomTitle === "") {
      enqueueSnackbar("제목을 입력해 주세요.", { variant: "warning" });
      return;
    }
    try {
      const response = await createMentoringRoom({
        token: accessToken,
        ...params,
      });

      enqueueSnackbar(`새 질의응답방이 생성되었습니다. ${response.url}`, {
        variant: "success",
      });
      setCreatedURL(response.url);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("질의응답방 생성에 실패했습니다.", { variant: "error" });
      throw error;
    }
  };
};

export const debouncedSubmitMentoringRoomForm = (
  config: SubmitMentoringRoomFormConfig
) => {
  const handleSubmitMentoringRoomForm = new ApiFetchEventHandler(
    submitMentoringRoomForm(config),
    500
  );

  return () => handleSubmitMentoringRoomForm.debounce();
};
