import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token?: string;
  enterUserPosition: string;
  examReviewRoomId: number;
}

interface ApiResponse {
  message: string;
  examReviewRoomId: number;
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
  enqueueSnackbar: EnqueueSnackbar,
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
      queryClient.invalidateQueries(["examReviewRoom"]);
      navigation(`/exam-review-room/${data.examReviewRoomId}`);
      setIsModalOpen(false);
    },
    onError: () => {
      enqueueSnackbar("입장하지 못했습니다", { variant: "error" });
    },
  });
