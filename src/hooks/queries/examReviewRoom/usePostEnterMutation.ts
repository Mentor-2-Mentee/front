import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import queryClient from "../queryClientInit";

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
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  navigation: NavigateFunction,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postEnterUserType, {
    onSettled(data, error, variables, context) {
      if (!variables.token) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examReviewRoom", examScheduleId]);
      navigation(`/exam-review-room/${data.examScheduleId}`);
      setIsModalOpen(false);
    },
    onError: () => {
      enqueueSnackbar("입장하지 못했습니다", { variant: "error" });
    },
  });
