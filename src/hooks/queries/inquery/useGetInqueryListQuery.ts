import { useQuery } from "@tanstack/react-query";
import { InqueryListElement } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  page: number;
  limit: number;
}

interface ApiResponse {
  message: string;
  inqueryList: InqueryListElement[];
}

const getInqueryList = async (params: ApiParams) => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/inquery/list?page=${params.page}&limit=${params.limit}`
  );
  return data.inqueryList;
};

export const useGetInqueryListQuery = (params: ApiParams) =>
  useQuery(["inquery", params.page], () => getInqueryList(params));
