import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { FilterOption } from "../../../commonElements/FilterOptionHandler";
import { ImageFile } from "../../../commonElements/ImageUpload";
import axiosInstance from "../../../api/axiosInstance";
import { mentoringRoomQueryClient } from ".";

interface ApiParams {
  token: string;
  mentoringRoomTitle: string;
  appliedTagOptions: Omit<FilterOption, "filterKeywords">;
  mentoringRoomDescription: string;
  imageFileList: ImageFile[];
}

interface ApiResponse {
  message: string;
  url: string;
}

const postMentoringRoom = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();

  for (const [key, value] of Object.entries(params)) {
    if (key === "imageFileList") continue;
    formData.append(key, JSON.stringify(value));
  }

  params.imageFileList.map((imageFile) => {
    formData.append("image[]", imageFile.fileData, imageFile.fileName);
  });
  const { data } = await axiosInstance(config).post("/live-rooms", formData);
  return data;
};

export const usePostMentoringRoomMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  setCreatedURL: React.Dispatch<React.SetStateAction<string | undefined>>
) =>
  useMutation(postMentoringRoom, {
    onSuccess: (data) => {
      mentoringRoomQueryClient.invalidateQueries(["mentoringRoom"]);
      enqueueSnackbar(`새 질의응답방이 생성되었습니다.`, {
        variant: "success",
      });
      setCreatedURL(data.url);
    },
    onError: () => {
      enqueueSnackbar(`질의응답방 생성에 실패했습니다.`, {
        variant: "error",
      });
    },
  });
