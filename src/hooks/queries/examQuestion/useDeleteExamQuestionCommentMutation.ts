import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(deleteExamQuestionComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examQuestionComment", examQuestionId]);
      queryClient.invalidateQueries(["examQuestion"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
