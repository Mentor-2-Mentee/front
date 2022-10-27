import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { examReviewRoomQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token: string;
  commentId: number;
}

interface ApiResponse {
  message: string;
}

const deleteExamQuestionComment = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete<ApiResponse>(
    `/exam-question-comment?commentId=${params.commentId}`
  );
  return data;
};

export const useDeleteExamQuestionCommentMutation = (
  examQuestionId: number,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(deleteExamQuestionComment, {
    onSuccess: (data) => {
      examReviewRoomQueryClient.invalidateQueries([
        "examQuestionComment",
        examQuestionId,
      ]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
