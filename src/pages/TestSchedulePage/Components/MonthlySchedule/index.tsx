import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TestScheduleCacheDataEntity } from "../../../../hooks/queries/testSchedule";
import { currentMonthlyDayListConstructor } from "./currentMonthlyDayListConstructor";
import DayNavigation from "./DayNavigation";
import CalenderHandler from "./CalenderHandler";
import ScheduleGrid from "./ScheduleGrid";
import { getTestScheduleCallback } from "./getTestScheduleCallback";
import { useLocation } from "react-router-dom";
import { getTestScheduleById } from "../../../../api/getTestScheduleById";

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
  const { hash } = useLocation();
  const testScheduleId = Number(hash.substr(1));

  const test = async (): Promise<TestScheduleCacheDataEntity> => {
    const result = await getTestScheduleById(testScheduleId);
    console.log("test result", result);
    return result;
  };

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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
