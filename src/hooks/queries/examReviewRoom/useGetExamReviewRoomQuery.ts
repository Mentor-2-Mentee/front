import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

interface GetExamReviewRoomParams {
  examReviewRoomId?: number;
}

interface GetExamReviewRoomResponse {
  message: string;
  examOrganizer: string;
  examType: string;
  examDate: string;
  enterCode: string | null;
  isRestricted: boolean;
  isArchived: boolean;
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
