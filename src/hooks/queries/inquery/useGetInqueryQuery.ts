import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { Inquery } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  inqueryId: number;
  password?: string;
}
interface ApiResponse {
  message: string;
  inquery: Inquery;
}

const getInquery = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).get<ApiResponse>(
    `/inquery?inqueryId=${params.inqueryId}&password=${params.password}`
  );

  return data.inquery;
};

export const useGetInqueryQuery = (params: ApiParams) =>
  useQuery(["inquery", params.inqueryId], () => getInquery(params));
