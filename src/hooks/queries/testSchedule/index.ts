import { QueryClient } from "react-query";

export interface TestSchedule {
  scheduleId: string;
  scheduleTitle: string;
  scheduledDate: Date;
}

export type TestScheduleMap = Map<string, TestSchedule[]>;

export interface TestScheduleCacheDataEntity {
  testScheduleMap: TestScheduleMap;
}

export const testScheduleQueryClient = new QueryClient();
