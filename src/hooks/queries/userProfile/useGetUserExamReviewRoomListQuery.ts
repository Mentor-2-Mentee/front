import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
}

interface ApiResponse {
  message: string;
  examReviewRoomList: {
    id: number;
    examType: string;
    organizer: string;
  }[];
}

const getUserExamReviewRoomList = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<ApiResponse>(
    "/user-profile/exam-review-room"
  );

  return data;
};

export const useGetUserExamReviewRoomListQuery = (params: ApiParams) =>
  useQuery(
    ["userProfile", "examReviewRoom"],
    () => getUserExamReviewRoomList(params),
    {
      enabled: Boolean(params.token),
    }
  );
