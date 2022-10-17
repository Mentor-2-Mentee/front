import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router";
import { EnterUserType } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  enterUserType?: EnterUserType;
  examReviewRoomId: number;
}

interface ApiResponse {
  message: string;
  examScheduleId: number;
  examType: string;
}

const postEnterUserType = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room/enter",
    params
  );

  console.log("enterRes", data);
  return data;
};

export const usePostEnterMutation = (
  handleModalOpen: () => void,
  navigation: NavigateFunction
) =>
  useMutation(postEnterUserType, {
    onSuccess: (data) => {
      if (data.message === "enteredUser") {
        navigation(`/exam-review-room/${data.examScheduleId}/${data.examType}`);
        return;
      }
      handleModalOpen();
    },
  });
