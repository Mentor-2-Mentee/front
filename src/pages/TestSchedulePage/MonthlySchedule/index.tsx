import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TestScheduleCacheDataEntity } from "../../../hooks/queries/testSchedule";
import { getTestSchedule } from "../../../hooks/queries/testSchedule/getTestSchedule";
import DayNavigation from "./DayNavigation";
import MonthlyScheduleHandler from "./MonthlyScheduleHandler";
import ScheduleGrid from "./ScheduleGrid";

export interface CurrentDate {
  year: number;
  month: number;
}

enum Day {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THR = 4,
  FRI = 5,
  SAT = 6,
}
const currentMonthlyScheduleList: Map<string, string> = new Map();
currentMonthlyScheduleList.set(
  new Date(2022, 7, 15).toString(),
  "오늘은 광복절"
);

export const MonthlySchedule = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [currentMonthlyDayList, setCurrentMonthlyDayList] = useState<Date[]>(
    []
  );

  const setMonthlyDayListByCurrentDate = (currentDate: CurrentDate) => {
    const endOfCurrentMonthDate = new Date(
      currentDate.year,
      currentDate.month + 1,
      0
    );

    const prevMonth: Date[] = [];
    const nextMonth: Date[] = [];
    const currentMonth: Date[] = [
      ...Array(endOfCurrentMonthDate.getDate()).keys(),
    ].map((dayIndex) => {
      const date = new Date(currentDate.year, currentDate.month, dayIndex + 1);

      if (dayIndex === 0 && date.getDay() !== Day.SUN) {
        [...Array(date.getDay()).keys()].map((prevMonthIndex) => {
          prevMonth.unshift(
            new Date(
              currentDate.year,
              currentDate.month,
              dayIndex + 1 - (prevMonthIndex + 1)
            )
          );
        });
      }

      if (
        dayIndex === endOfCurrentMonthDate.getDate() - 1 &&
        date.getDay() !== Day.SAT
      ) {
        [...Array(Day.SAT - date.getDay()).keys()].map((nextMonthIndex) => {
          nextMonth.push(
            new Date(
              currentDate.year,
              currentDate.month,
              dayIndex + 1 + nextMonthIndex + 1
            )
          );
        });
      }

      return date;
    });

    setCurrentMonthlyDayList([...prevMonth, ...currentMonth, ...nextMonth]);
  };

  useEffect(() => {
    setMonthlyDayListByCurrentDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (currentMonthlyDayList.length < 2) return;
    getTestSchedule({
      startDate: currentMonthlyDayList[0],
      endDate: currentMonthlyDayList[currentMonthlyDayList.length - 1],
    });
  }, [currentMonthlyDayList]);

  const { data, status } = useQuery<TestScheduleCacheDataEntity>([
    "testSchedule",
    currentMonthlyDayList[0],
    currentMonthlyDayList[currentMonthlyDayList.length - 1],
  ]);

  useEffect(() => {
    console.log("data", data?.testScheduleMap);
  }, [data]);

  return (
    <MonthlyScheduleContainer>
      <MonthlyScheduleHandler
        useCurrentDateState={[currentDate, setCurrentDate]}
      />
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
