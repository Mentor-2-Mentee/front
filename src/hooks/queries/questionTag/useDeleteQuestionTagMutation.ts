import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import axiosInstance from "../../../api/axiosInstance";
import { questionTagQueryClient } from ".";

interface ApiParams {
  token: string;
  parentTag?: string;
  tagName: string;
}

interface ApiResponse {
  message: string;
}

const deleteQuestionTag = async (params: ApiParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).delete(
    `/question-tag?tagname=${params.tagName}&parentTag=${params.parentTag}`
  );
  return data;
};

export const useDeleteQuestionTagMutation = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) =>
  useMutation(deleteQuestionTag, {
    onSuccess: (data) => {
      questionTagQueryClient.invalidateQueries(["questionTag"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
