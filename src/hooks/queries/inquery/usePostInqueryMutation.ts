import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  body: {
    title: string;
    description: string;
    instantName?: string;
    instantPassword?: string;
    isPrivate: boolean;
  };
}

interface ApiResponse {
  message: string;
}

const postInquery = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/inquery",
    params.body
  );

  console.log("saved data", data);

  return data;
};

export const usePostInqueryMutation = () => useMutation(postInquery);
