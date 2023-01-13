import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";

interface ApiParams {
  token?: string;
  imageFileList: FileList;
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

  for (const imageFile of params.imageFileList) {
    formData.append("image[]", imageFile, imageFile.name);
  }

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/images",
    formData
  );
  return data;
};

export const usePostImageMutation = (
  currentImageUrls: string[],
  imageUrlDispatcher: (imageUrls: string[]) => void,
  enqueueSnackbar?: EnqueueSnackbar,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postQuestionImage, {
    onSuccess: (data) => {
      imageUrlDispatcher([...currentImageUrls, ...data.url]);
      if (enqueueSnackbar)
        enqueueSnackbar(data.message, { variant: "success" });
      if (setOpen) setOpen(false);
    },
  });
