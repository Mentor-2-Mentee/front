import { QueryClient } from "react-query";
import { UserProfile } from "../../../api/user/getUserProfile";

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
  requestWorkField: string;
  requestUserList: UserProfile[];
}

export type TestScheduleMap = Map<string, TestSchedule[]>;
export type CreateTestMentoringRoomRequestMap = Map<
  string,
  CreateTestMentoringRoomRequest[]
>;

export interface TestScheduleCacheDataEntity {
  testScheduleMap: TestScheduleMap;
  createTestMentoringRoomRequestMap: CreateTestMentoringRoomRequestMap;
}

export const initialTestScheduleCacheData: TestScheduleCacheDataEntity = {
  testScheduleMap: new Map<string, TestSchedule[]>(),
  createTestMentoringRoomRequestMap: new Map<
    string,
    CreateTestMentoringRoomRequest[]
  >(),
};

export const testScheduleQueryClient = new QueryClient();

export * from "./createTestSchedule";
export * from "./deleteTestSchedule";
export * from "./getTestSchedule";
export * from "./updateTestSchedule";
