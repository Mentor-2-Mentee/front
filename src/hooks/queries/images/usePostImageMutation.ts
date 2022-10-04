import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ImageFile } from "../../../commonElements/ImageUpload";
import axiosInstance from "../../../api/axiosInstance";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

interface ApiParams {
  token?: string;
  imageFileList: ImageFile[];
}

interface ApiResponse {
  message: string;
  url: string[];
}

const postQuestionImage = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const formData = new FormData();

  params.imageFileList.map((imageFile) => {
    formData.append("image[]", imageFile.fileData, imageFile.fileName);
  });

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/images",
    formData
  );
  return data;
};

export const usePostImageMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  setQuestionImageUrl: React.Dispatch<React.SetStateAction<string[]>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postQuestionImage, {
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      setQuestionImageUrl(data.url);
      setOpen(false);
    },
  });
