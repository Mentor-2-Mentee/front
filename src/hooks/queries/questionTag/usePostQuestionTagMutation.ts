import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";

interface ApiParams {
  token: string;
  parentTag?: string;
  tagName: string;
}

interface ApiResponse {
  message: string;
  result: boolean;
}

const postQuestionTag = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post(`/question-tag`, params);
  return data;
};

export const usePostQuestionTagMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(postQuestionTag, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questionTag"]);
      if (!data.result) {
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
