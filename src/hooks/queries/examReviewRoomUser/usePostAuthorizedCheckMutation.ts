import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  examReviewRoomId: number;
}

interface ApiResponse {
  message: string;
  userPosition: string | false;
}

const getAuthorizedCheck = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<ApiResponse>(
    `/exam-review-room-user/check?examReviewRoomId=${params.examReviewRoomId}`
  );
  return data;
};

export const useGetAuthorizedCheckQuery = (params: ApiParams) =>
  useQuery(
    ["examReviewRoomUser", params.examReviewRoomId],
    () => getAuthorizedCheck(params),
    { enabled: Boolean(params.token) }
  );
