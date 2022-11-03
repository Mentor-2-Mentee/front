import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../auth";
import { ExamReviewRoom, ExamReviewRoomUser } from ".";

interface GetUserInfoListParams {
  token?: string;
  examReviewRoomId?: number;
}

interface GetUserInfoListResponse {
  message: string;
  userList: ExamReviewRoomUser[];
}

const getUserInfoList = async (params: GetUserInfoListParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<GetUserInfoListResponse>(
    `/exam-review-room/user-list?examReviewRoomId=${params.examReviewRoomId}`
  );
  console.log("userList data", data);
  return data;
};

export const useGetUserInfoListQuery = (params: GetUserInfoListParams) =>
  useQuery(
    ["examReviewRoom", "userList", params.examReviewRoomId],
    () => getUserInfoList(params),
    {
      enabled: Boolean(params.examReviewRoomId),
    }
  );
