import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { CurrentDate } from ".";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import {
  TestSchedule,
  TestScheduleMap,
} from "../../../hooks/queries/testSchedule";
import DateFormatting from "../../../utils/dateFormatting";

interface ScheduleGridProps {
  currentDate: CurrentDate;
  currentMonthlyDayList: Date[];
  currentMonthlyScheduleList: TestScheduleMap;
}

export const ScheduleGrid = ({
  currentDate,
  currentMonthlyDayList,
  currentMonthlyScheduleList,
}: ScheduleGridProps): JSX.Element => {
  const setDayColor = (date: Date): SignatureColor => {
    const day = date.getDay();
    if (day === 0) return SignatureColor.RED;
    if (day === 6) return SignatureColor.BLUE;
    return SignatureColor.BLACK_80;
  };
  const setDayFilter = (date: Date) => {
    if (currentDate.month !== date.getMonth()) return "opacity(50%)";
  };

  return (
    <ScheduleGridContainer>
      {currentMonthlyDayList.map((day) => {
        if (day === undefined) return <CircularProgress />;

        const testScheduleList =
          currentMonthlyScheduleList.get(new DateFormatting(day).YYYY_MM_DD) ||
          [];

        return (
          <DailySchedule key={day.toString()}>
            <DailyScheduleHeader
              sx={{
                color: setDayColor(day),
                filter: setDayFilter(day),
              }}
            >
              {day.getDate()}
            </DailyScheduleHeader>
            <DailyScheduleHeaderElement>
              {renderTestScheduleList(testScheduleList)}
            </DailyScheduleHeaderElement>
          </DailySchedule>
        );
      })}
    </ScheduleGridContainer>
  );
};

const renderTestScheduleList = (testScheduleList: TestSchedule[]) => {
  if (testScheduleList.length === 0) return <div>{null}</div>;
  return testScheduleList.map((testSchedule) => {
    return <div>{testSchedule.testScheduleTitle}</div>;
  });
};

const ScheduleGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7,1fr)",
}));

const DailySchedule = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
}));

const DailyScheduleHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.WHITE}`,
  boxSizing: "border-box",
  padding: theme.spacing(0.25, 0, 0.25, 0),
  fontWeight: 600,
}));

const DailyScheduleHeaderElement = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: theme.spacing(10),
  flexFlow: "column",
}));

export default ScheduleGrid;
