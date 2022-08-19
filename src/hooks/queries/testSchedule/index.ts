import { QueryClient } from "react-query";

export interface TestSchedule {
  testScheduleId: number;
  testScheduleTitle: string;
  testUrl: string;
  testDate: Date;
  testField: string;
  testDescription: string;
  imageFiles: string[];
}

export type TestScheduleMap = Map<string, TestSchedule[]>;

export interface TestScheduleCacheDataEntity {
  testScheduleMap: TestScheduleMap;
}

export const testScheduleQueryClient = new QueryClient();

export * from "./createTestSchedule";
export * from "./deleteTestSchedule";
export * from "./getTestSchedule";
export * from "./updateTestSchedule";
