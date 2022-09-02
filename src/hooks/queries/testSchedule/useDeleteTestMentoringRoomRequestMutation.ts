import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { testScheduleQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface DeleteTestMentoringRoomRequestParams {
  token: string;
  testField: string;
  testScheduleId: number;
}

const deleteTestMentoringRoomRequest = async (
  params: DeleteTestMentoringRoomRequestParams
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  const { data } = await axiosInstance(config).delete(
    `/test-mentoring-room/create-request?testScheduleId=${params.testScheduleId}&testField=${params.testField}`
  );
  return data;
};

export const useDeleteTestMentoringRoomRequestMutation = (
  testScheduleId: number
) =>
  useMutation(deleteTestMentoringRoomRequest, {
    onSuccess: () => {
      testScheduleQueryClient.invalidateQueries([
        "testMentoringRoom",
        "createRequest",
        testScheduleId,
      ]);
    },
  });
