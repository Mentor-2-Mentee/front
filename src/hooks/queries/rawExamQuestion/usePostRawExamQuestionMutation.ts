import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { RawExamQuestion } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  rawExamQuestionForm: Pick<
    RawExamQuestion,
    "examQuestionId" | "questionText" | "solution"
  >;
}

interface ApiResponse {
  message: string;
  isSaved: boolean;
}

const postRawExamQuestion = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "raw-exam-question",
    params.rawExamQuestionForm
  );
  return data;
};

export const usePostRawExamQuestionMutation = (
  examReviewRoomId: number,
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(postRawExamQuestion, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examQuestion", examReviewRoomId]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
