import { QueryClient } from "@tanstack/react-query";
import { UserProfile } from "../../../api/user/getUserProfile";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export interface ExamSchedule {
  examScheduleId: number;
  examScheduleTitle: string;
  examUrl: string;
  examDate: string;
  examField: string;
  examDescription: string;
  imageFiles: string[];
}

export interface CreateExamMentoringRoomRequest {
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  requestUserList: UserProfile[];
}

export interface ExamMentoringRoom {
  examMentoringRoomId: number;
  startedAt: string;
  createdAt: string;
  examScheduleTitle: string;
  examScheduleId: number;
  examField: string;
  userList: number[];
  //chat
  //examquestion
}

export type ExamScheduleMap = Map<string, ExamSchedule[]>;
export type CreateExamMentoringRoomRequestMap = Map<
  string,
  CreateExamMentoringRoomRequest[]
>;
export type ExamMentoringRoomMap = Map<string, ExamMentoringRoom[]>;

export interface ExamScheduleCacheDataEntity {
  examScheduleMap: ExamScheduleMap;
  createExamMentoringRoomRequestMap: CreateExamMentoringRoomRequestMap;
  examMentoringRoomMap: ExamMentoringRoomMap;
}

export const initialExamScheduleCacheData: ExamScheduleCacheDataEntity = {
  examScheduleMap: new Map<string, ExamSchedule[]>(),
  createExamMentoringRoomRequestMap: new Map<
    string,
    CreateExamMentoringRoomRequest[]
  >(),
  examMentoringRoomMap: new Map<string, ExamMentoringRoom[]>(),
};

export const examScheduleQueryClient = new QueryClient();

export * from "./createExamSchedule";
export * from "./deleteExamSchedule";
export * from "./updateExamSchedule";

//repactQuery
export * from "./useGetExamScheduleQuery";
export * from "./useGetExamScheduleListQuery";
export * from "./useGetExamMentoringRoomListQuery";
export * from "./useGetExamMentoringRoomRequestListQuery";
export * from "./usePostExamMentoringRoomRequestMutation";
export * from "./useDeleteExamMentoringRoomRequestMutation";