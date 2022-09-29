import { QueryClient } from "@tanstack/react-query";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import { UserProfile } from "../auth";

export interface ExamSchedule {
  examScheduleId: number;
  examScheduleTitle: string;
  examUrl: string;
  examDate: string;
  examField: string;
  examDescription: string;
  imageFiles: string[];
}

export interface CreateExamReviewRoomRequest {
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  requestUserList: UserProfile[];
}

export interface ExamReviewRoom {
  id: number;
  examReviewRoomId: number;
  updatedAt: string;
  createdAt: string;
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  userList: number[];
  chatListBundle: string[]; //미정
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

export const examScheduleQueryClient = new QueryClient();

export * from "./useGetExamScheduleQuery";
export * from "./useGetExamScheduleListQuery";
export * from "./useUpdateExamScheduleMutation";

export * from "./useGetExamReviewRoomListQuery";
export * from "./useGetExamReviewRoomRequestListQuery";
export * from "./usePostExamReviewRoomRequestMutation";
export * from "./useDeleteExamReviewRoomRequestMutation";
