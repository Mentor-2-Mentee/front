import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetTestScheduleQuery } from "../../../../hooks/queries/testSchedule";
import { currentMonthlyDayListConstructor } from "./currentMonthlyDayListConstructor";
import DayNavigation from "./DayNavigation";
import CalenderHandler from "./CalenderHandler";
import ScheduleGrid from "./ScheduleGrid";
import { useLocation } from "react-router-dom";

export interface CurrentDate {
  year: number;
  month: number;
}

export const MonthlySchedule = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [currentMonthlyDayList, setCurrentMonthlyDayList] = useState<string[]>(
    []
  );
  const { hash } = useLocation();
  const testScheduleId = Number(hash.substr(1));

  useEffect(() => {
    const currentMonthlyDayList = currentMonthlyDayListConstructor(currentDate);
    setCurrentMonthlyDayList(currentMonthlyDayList);
  }, [currentDate]);

  const testScheduleQuery = useGetTestScheduleQuery({
    startDate: currentMonthlyDayList[0],
    endDate: currentMonthlyDayList[currentMonthlyDayList.length - 1],
  });

  return (
    <MonthlyScheduleContainer>
      <CalenderHandler useCurrentDateState={[currentDate, setCurrentDate]} />
      <DayNavigation />

      <>
        {testScheduleQuery.status !== "success" ? (
          <CircularProgress />
        ) : (
          <ScheduleGrid
            currentDate={currentDate}
            currentMonthlyDayList={currentMonthlyDayList}
            currentMonthlyScheduleList={testScheduleQuery.data}
          />
        )}
      </>
    </MonthlyScheduleContainer>
  );
};

const MonthlyScheduleContainer = styled("div")(({ theme }) => ({
  // background: "yellowgreen",
}));

export default MonthlySchedule;
