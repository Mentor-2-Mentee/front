import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../auth";

interface GetUserInfoListParams {
  token?: string;
  examType?: string;
  examScheduleId?: string;
}

interface GetUserInfoListResponse {
  message: string;
  userInfoList: UserProfile[];
}

const getUserInfoList = async (params: GetUserInfoListParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).get<GetUserInfoListResponse>(
    `/exam-review-room/userInfo?examScheduleId=${params.examScheduleId}&examType=${params.examType}`
  );
  return data;
};

export const useGetUserInfoListQuery = (params: GetUserInfoListParams) =>
  useQuery(
    ["examReviewRoom", "userInfoList", params.examScheduleId, params.examType],
    () => getUserInfoList(params),
    {
      enabled: Boolean(params.examScheduleId) && Boolean(params.examType),
    }
  );
