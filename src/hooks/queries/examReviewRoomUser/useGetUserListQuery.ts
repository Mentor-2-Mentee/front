import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { ExamReviewRoomUser } from ".";

interface GetUserInfoListParams {
  token?: string;
  examReviewRoomId?: number;
}

interface GetUserInfoListResponse {
  message: string;
  userList: ExamReviewRoomUser[];
}

const getUserList = async (params: GetUserInfoListParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).get<GetUserInfoListResponse>(
    `/exam-review-room-user/list?examReviewRoomId=${params.examReviewRoomId}`
  );
  return data;
};

export const useGetUserListQuery = (params: GetUserInfoListParams) =>
  useQuery(
    ["examReviewRoom", "userList", params.examReviewRoomId],
    () => getUserList(params),
    {
      enabled: Boolean(params.examReviewRoomId),
    }
  );
