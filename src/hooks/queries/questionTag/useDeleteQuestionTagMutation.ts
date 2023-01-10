import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: EnqueueSnackbar
) =>
  useMutation(deleteQuestionTag, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questionTag"]);
      enqueueSnackbar(data.message, { variant: "success" });
    },
  });
