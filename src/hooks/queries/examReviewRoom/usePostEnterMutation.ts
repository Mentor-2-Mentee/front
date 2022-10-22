import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router";
import { examReviewRoomQueryClient } from ".";
// import { EnterUserType } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface ApiParams {
  token?: string;
  enterUserType?: "participantUser" | "nonParticipantUser";
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
  return data;
};

export const usePostEnterMutation = (
  examScheduleId: number,
  navigation: NavigateFunction,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postEnterUserType, {
    onSuccess: (data) => {
      examReviewRoomQueryClient.invalidateQueries([
        "examReviewRoom",
        examScheduleId,
      ]);
      // navigation(`/exam-review-room/${data.examScheduleId}/${data.examType}`);
      setIsModalOpen(false);
    },
  });
