import { EffectCallback } from "react";
import { getTestSchedule } from "../../../../hooks/queries/testSchedule/getTestSchedule";
import DateFormatting from "../../../../utils/dateFormatting";

export const getTestScheduleCallback = (
  currentMonthlyDayList: Date[]
): EffectCallback => {
  return () => {
    if (currentMonthlyDayList.length < 2) return;
    getTestSchedule({
      startDate: new DateFormatting(currentMonthlyDayList[0]).YYYY_MM_DD,
      endDate: new DateFormatting(
        currentMonthlyDayList[currentMonthlyDayList.length - 1]
      ).YYYY_MM_DD,
    });
  };
};
