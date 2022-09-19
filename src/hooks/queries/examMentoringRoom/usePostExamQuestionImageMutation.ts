import { AxiosRequestConfig } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ImageFile } from "../../../commonElements/ImageUpload";
import { examMentoringRoomQueryClient, ExamQuestion } from ".";

interface ApiParams {
  token?: string;
  imageFileList: ImageFile[];
  examQuestionId: number;
}

interface ApiResponse {
  message: string;
  imageUrl: string;
}

const postExamQuestionImage = async (
  params: ApiParams
): Promise<ApiResponse> => {
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

  formData.append(
    "image",
    params.imageFileList[0].fileData,
    params.imageFileList[0].fileName
  );

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-question/question-image",
    formData
  );

  console.log(data);

  return data;
};

export const usePostExamQuestionImageMutation = (
  nowQuestionIndex: number,
  nowQuestion: ExamQuestion,
  sendChangeData: (
    nowQuestionIndex: number,
    updateExamQuestionData: ExamQuestion
  ) => void,
  setImageFileList: React.Dispatch<React.SetStateAction<ImageFile[]>>,
  handleClose: () => void
) =>
  useMutation(postExamQuestionImage, {
    onSuccess: (response) => {
      sendChangeData(nowQuestionIndex, {
        ...nowQuestion,
        questionImageUrl: [response.imageUrl],
      });
      handleClose();
    },
  });
