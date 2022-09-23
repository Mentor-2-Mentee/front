import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetExamScheduleListQuery } from "../../../../hooks/queries/examSchedule";
import { currentMonthlyDayListConstructor } from "./currentMonthlyDayListConstructor";
import DayNavigation from "./DayNavigation";
import CalenderHandler from "./CalenderHandler";
import ScheduleGrid from "./ScheduleGrid";

export interface Current_YYYY_MM {
  year: number;
  month: number;
}

export const MonthlySchedule = (): JSX.Element => {
  const [current_YYYY_MM, setCurrent_YYYY_MM] = useState<Current_YYYY_MM>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [currentMonthlyDayList, setCurrentMonthlyDayList] = useState<string[]>(
    []
  );

  useEffect(() => {
    const currentMonthlyDayList =
      currentMonthlyDayListConstructor(current_YYYY_MM);
    setCurrentMonthlyDayList(currentMonthlyDayList);
  }, [current_YYYY_MM]);

  const examScheduleListQuery = useGetExamScheduleListQuery({
    startDate: currentMonthlyDayList[0],
    endDate: currentMonthlyDayList[currentMonthlyDayList.length - 1],
  });

  if (examScheduleListQuery.status === "loading") return <CircularProgress />;
  if (examScheduleListQuery.status === "error") return <div>Error</div>;

  return (
    <>
      <CalenderHandler
        useCurrent_YYYY_MM_State={[current_YYYY_MM, setCurrent_YYYY_MM]}
      />
      <DayNavigation />

      <ScheduleGrid
        current_YYYY_MM={current_YYYY_MM}
        currentMonthlyDayList={currentMonthlyDayList}
        currentMonthlyScheduleList={examScheduleListQuery.data}
      />
    </>
  );
};

export default MonthlySchedule;
