import { QueryClient } from "@tanstack/react-query";
import { UserProfile } from "../../../api/user/getUserProfile";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export interface TestSchedule {
  testScheduleId: number;
  testScheduleTitle: string;
  testUrl: string;
  testDate: string;
  testField: string;
  testDescription: string;
  imageFiles: string[];
}

export interface CreateTestMentoringRoomRequest {
  testScheduleId: number;
  testField: string;
  requestUserList: UserProfile[];
}

export interface TestMentoringRoom {
  testMentoringRoomId: number;
  startedAt: string;
  createdAt: string;
  testScheduleId: number;
  testField: string;
  userList: number[];
  //chat
  //testquestion
}

export type TestScheduleMap = Map<string, TestSchedule[]>;
export type CreateTestMentoringRoomRequestMap = Map<
  string,
  CreateTestMentoringRoomRequest[]
>;
export type TestMentoringRoomMap = Map<string, TestMentoringRoom[]>;

export interface TestScheduleCacheDataEntity {
  testScheduleMap: TestScheduleMap;
  createTestMentoringRoomRequestMap: CreateTestMentoringRoomRequestMap;
  testMentoringRoomMap: TestMentoringRoomMap;
}

export const initialTestScheduleCacheData: TestScheduleCacheDataEntity = {
  testScheduleMap: new Map<string, TestSchedule[]>(),
  createTestMentoringRoomRequestMap: new Map<
    string,
    CreateTestMentoringRoomRequest[]
  >(),
  testMentoringRoomMap: new Map<string, TestMentoringRoom[]>(),
};

export const testScheduleQueryClient = new QueryClient();

export * from "./createTestSchedule";
export * from "./deleteTestSchedule";
export * from "./updateTestSchedule";

//repactQuery
export * from "./useGetTestScheduleQuery";
export * from "./useGetTestScheduleListQuery";
export * from "./useGetTestMentoringRoomListQuery";
export * from "./useGetTestMentoringRoomRequestListQuery";
export * from "./usePostTestMentoringRoomRequestMutation";
export * from "./useDeleteTestMentoringRoomRequestMutation";
