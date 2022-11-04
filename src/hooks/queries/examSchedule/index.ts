import { QueryClient } from "@tanstack/react-query";
import { CreateExamReviewRoomRequest, ExamReviewRoom } from "../examReviewRoom";

/**
 * id: 스케쥴id, number
 * organizer: ex - 서부발전
 * scheduleType: ex - 채용
 */
export interface ExamSchedule {
  id: number;
  organizer: string;
  examDate: string;
  examStartTime?: string;
  examEndTime?: string;
  examUrl: string;
  scheduleType: string;
  description: string;
  imageUrl: string[];
  examReviewRoomId: number[];
  examReviewRoom: ExamReviewRoom[];
}

export type ExamScheduleMap = Map<string, ExamSchedule[]>;
export type CreateExamReviewRoomRequestMap = Map<
  string,
  CreateExamReviewRoomRequest[]
>;
export type ExamReviewRoomMap = Map<string, ExamReviewRoom[]>;

export interface ExamScheduleQueryCache {
  examScheduleMap: ExamScheduleMap;
  createExamReviewRoomRequestMap: CreateExamReviewRoomRequestMap;
  examReviewRoomMap: ExamReviewRoomMap;
}

export const initialExamScheduleCacheData: ExamScheduleQueryCache = {
  examScheduleMap: new Map<string, ExamSchedule[]>(),
  createExamReviewRoomRequestMap: new Map<
    string,
    CreateExamReviewRoomRequest[]
  >(),
  examReviewRoomMap: new Map<string, ExamReviewRoom[]>(),
};

export * from "./useGetExamScheduleQuery";
export * from "./useGetExamScheduleListQuery";
export * from "./useUpdateExamScheduleMutation";
