import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ExamReviewRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamReviewRoomParams {
  examReviewRoomId?: number;
}

interface GetExamReviewRoomResponse {
  message: string;
  examOrganizer: string;
  examType: string;
}

const getExamReviewRoom = async (params: GetExamReviewRoomParams) => {
  const { data } = await axiosInstance().get<GetExamReviewRoomResponse>(
    `/exam-review-room?examReviewRoomId=${params.examReviewRoomId}`
  );
  return data;
};

export const useGetExamReviewRoomQuery = (params: GetExamReviewRoomParams) =>
  useQuery(
    ["examReviewRoom", params.examReviewRoomId],
    () => getExamReviewRoom(params),
    {
      enabled: Boolean(params.examReviewRoomId),
    }
  );
