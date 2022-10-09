import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  newName: string;
}

interface ApiResponse {
  message: string;
  canUse: boolean;
}

const getNewNameCheck = async (params: ApiParams): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get(
    `/user-profile/name-check?newname=${params.newName}`
  );
  return data;
};

export const useGetNewNameCheckQuery = (params: ApiParams) =>
  useQuery(["newNameCheck", params], () => getNewNameCheck(params), {
    enabled: Boolean(params.newName),
  });
