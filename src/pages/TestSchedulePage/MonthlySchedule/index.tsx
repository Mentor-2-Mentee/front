import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TestScheduleCacheDataEntity } from "../../../hooks/queries/testSchedule";
import { currentMonthlyDayListConstructor } from "./currentMonthlyDayListConstructor";
import DayNavigation from "./DayNavigation";
import CalenderHandler from "./CalenderHandler";
import ScheduleGrid from "./ScheduleGrid";
import { getTestScheduleCallback } from "./getTestScheduleCallback";

export interface CurrentDate {
  year: number;
  month: number;
}

export const MonthlySchedule = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [currentMonthlyDayList, setCurrentMonthlyDayList] = useState<Date[]>(
    []
  );

  const { data, status } = useQuery<TestScheduleCacheDataEntity>([
    "testSchedule",
  ]);

  useEffect(
    currentMonthlyDayListConstructor(currentDate, setCurrentMonthlyDayList),
    [currentDate]
  );
  useEffect(getTestScheduleCallback(currentMonthlyDayList), [
    currentMonthlyDayList,
  ]);

  return (
    <MonthlyScheduleContainer>
      <CalenderHandler useCurrentDateState={[currentDate, setCurrentDate]} />
      <DayNavigation />
      {status === "loading" || data === undefined ? (
        <CircularProgress />
      ) : (
        <ScheduleGrid
          currentDate={currentDate}
          currentMonthlyDayList={currentMonthlyDayList}
          currentMonthlyScheduleList={data.testScheduleMap}
        />
      )}
    </MonthlyScheduleContainer>
  );
};

const MonthlyScheduleContainer = styled("div")(({ theme }) => ({
  // background: "yellowgreen",
}));

export default MonthlySchedule;
