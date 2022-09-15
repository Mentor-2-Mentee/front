import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import { UserProfile } from "../../../api/user/getUserProfile";

interface GetUserInfoListParams {
  token?: string;
  examField?: string;
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
    `/exam-mentoring-room/userInfo?examScheduleId=${params.examScheduleId}&examField=${params.examField}`
  );
  return data;
};

export const useGetUserInfoListQuery = (params: GetUserInfoListParams) =>
  useQuery(
    [
      "examMentoringRoom",
      "userInfoList",
      params.examScheduleId,
      params.examField,
    ],
    () => getUserInfoList(params),
    {
      enabled: Boolean(params.examScheduleId) && Boolean(params.examField),
    }
  );
