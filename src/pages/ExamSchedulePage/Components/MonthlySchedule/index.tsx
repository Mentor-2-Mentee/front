import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetExamScheduleListQuery } from "../../../../hooks/queries/examSchedule";
import { currentMonthlyDayListConstructor } from "./currentMonthlyDayListConstructor";
import DayNavigation from "./DayNavigation";
import CalenderHandler from "./CalenderHandler";
import ScheduleGrid from "./ScheduleGrid";
import { useLocation, useSearchParams } from "react-router-dom";

export interface Current_YYYY_MM {
  year: number;
  month: number;
}

export const MonthlySchedule = (): JSX.Element => {
  const [searchParams, _] = useSearchParams();
  const location_YYYY = Number(searchParams.get("year"));
  const location_MM = Number(searchParams.get("month")) - 1;
  const [current_YYYY_MM, setCurrent_YYYY_MM] = useState<Current_YYYY_MM>({
    year: searchParams.get("year") ? location_YYYY : new Date().getFullYear(),
    month: searchParams.get("month") ? location_MM : new Date().getMonth(),
  });
  const [currentMonthlyDayList, setCurrentMonthlyDayList] = useState<string[]>(
    []
  );
  const hash = useLocation();

  useEffect(() => {
    const currentMonthlyDayList =
      currentMonthlyDayListConstructor(current_YYYY_MM);
    setCurrentMonthlyDayList(currentMonthlyDayList);
    if (location_YYYY && location_MM) return;
    if (hash) return;
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
