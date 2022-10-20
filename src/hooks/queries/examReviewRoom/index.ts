import { QueryClient } from "@tanstack/react-query";
import { UserProfile } from "../auth";

export type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_QUESTION";
export type EnterUserType = "관리자" | "도우미" | "응시자" | "미응시자";

export interface ExamReviewRoom {
  id: number;
  createdAt: string;
  updatedAt: string;
  /**
   * examType ex - 화공직
   */
  examType: string;
  /**
   * examOrganizer ex - 서부발전
   */
  examOrganizer: string;
  examQuestionId: number[];
  adminUserId: string[];
  participantUserId: string[];
  nonParticipantUserId: string[];
}

export interface CreateExamReviewRoomRequest {
  id: number;
  examScheduleId: number;
  examType: string;
  totalUserCount: number;
  userExist: false | "participantUser" | "nonParticipantUser";
}

export interface ExamQuestion {
  examQuestionId: number;
  questionText: string;
  answerExampleList: string[];
  answer: string;
  questionImageUrl: string[];
  solution: string;
  questionType: QuestionType;
}

export interface ExamReviewRoomQueryCache {
  examQuestionList: ExamQuestion[];
  liveWrittingUser: number[];
}

export const examReviewRoomQueryClient = new QueryClient();

export * from "./useGetExamReviewRoomRequestListQuery";
export * from "./usePostExamReviewRoomRequestMutation";
export * from "./useCancelRequestMutation";

export * from "./useGetExamReviewRoomListQuery";

export * from "./useGetExamReviewRoomQuery";
export * from "./usePostExamReviewRoomFormMutation";

export * from "./useQuestionSocketQuery";
