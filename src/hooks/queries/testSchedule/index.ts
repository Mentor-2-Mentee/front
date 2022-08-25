import { QueryClient } from "react-query";
import { UserProfile } from "../../../api/user/getUserProfile";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export interface TestSchedule {
  testScheduleId: number;
  testScheduleTitle: string;
  testUrl: string;
  testDate: Date;
  testField: string;
  testDescription: string;
  imageFiles: string[];
}

export interface CreateTestMentoringRoomRequest {
  testScheduleId: number;
  requestTestField: string;
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

export const testScheduleQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
      cacheTime: 5,
    },
  },
});

export * from "./createTestSchedule";
export * from "./deleteTestSchedule";
export * from "./getTestSchedule";
export * from "./updateTestSchedule";
