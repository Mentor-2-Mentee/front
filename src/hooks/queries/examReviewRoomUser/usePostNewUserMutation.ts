import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import { EnqueueSnackbar } from "../../../models/types";
import queryClient from "../queryClientInit";

interface ApiParams {
  token?: string;
  body: {
    isParticipant: boolean;
    examReviewRoomId: number;
    enterCode?: string;
  };
}

interface ApiResponse {
  message: string;
  examReviewRoomId: number;
}

const postNewUser = async (params: ApiParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).post<ApiResponse>(
    "/exam-review-room-user",
    params.body
  );
  return data;
};

export const usePostNewUserMutation = (
  enqueueSnackbar: EnqueueSnackbar,
  navigation: NavigateFunction,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation(postNewUser, {
    onSettled(data, error, variables, context) {
      if (!variables.token) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["examReviewRoom"]);
      navigation(`/exam-review-room/${data.examReviewRoomId}#questions`);
      setIsModalOpen(false);
    },
    onError: () => {
      enqueueSnackbar("입장하지 못했습니다", { variant: "error" });
    },
  });
