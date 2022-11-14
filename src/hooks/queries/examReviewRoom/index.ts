import { ExamQuestion } from "../examQuestion";

export type UserExist =
  | false
  | "participantUser"
  | "nonParticipantUser"
  | "adminUser";
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
  isRestricted?: boolean;
  enterCode?: string;
}

export interface CreateExamReviewRoomRequest {
  id: number;
  examScheduleId: number;
  examType: string;
  totalUserCount: number;
  userExist: false | "participantUser" | "nonParticipantUser";
}

export interface ExamReviewRoomQueryCache {
  examQuestionList: ExamQuestion[];
  liveWrittingUser: number[];
}

export * from "./useGetExamReviewRoomRequestListQuery";
export * from "./usePostExamReviewRoomRequestMutation";
export * from "./useCancelRequestMutation";

export * from "./useGetExamReviewRoomListQuery";

export * from "./useGetExamReviewRoomQuery";
export * from "./usePostExamReviewRoomFormMutation";

export * from "./useQuestionSocketQuery";
