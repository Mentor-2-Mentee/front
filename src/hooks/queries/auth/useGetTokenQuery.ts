import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  authCode: string | null;
}

interface ApiResponse {
  message: string;
  isFirstSignIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const getToken = async (params: ApiParams): Promise<ApiResponse> => {
  if (params.authCode === null) throw Error("Invalid AuthCode");
  const { data } = await axiosInstance().post("/oauth/token", params);
  return data;
};

export const useGetTokenQuery = (params: ApiParams) =>
  useQuery(["token", params.authCode], () => getToken(params), {
    enabled: Boolean(params.authCode),
  });
