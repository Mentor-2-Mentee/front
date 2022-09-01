import { styled } from "@mui/system";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { CurrentDate } from ".";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import {
  TestSchedule,
  TestScheduleMap,
} from "../../../../hooks/queries/testSchedule";
import DateFormatting from "../../../../utils/dateFormatting";
import { useState } from "react";
import ScheduleModal from "./ScheduleModal";
import { useNavigate } from "react-router";

interface ScheduleGridProps {
  currentDate: CurrentDate;
  currentMonthlyDayList: string[];
  currentMonthlyScheduleList: TestSchedule[];
}

const setDayColor = (date: string): SignatureColor => {
  const day = new Date(date).getDay();
  if (day === 0) return SignatureColor.RED;
  if (day === 6) return SignatureColor.BLUE;
  return SignatureColor.BLACK_80;
};
const setDayFilter = (currentMonth: number, date: string) => {
  if (currentMonth !== new Date(date).getMonth()) return "opacity(50%)";
};
export const ScheduleGrid = ({
  currentDate,
  currentMonthlyDayList,
  currentMonthlyScheduleList,
}: ScheduleGridProps): JSX.Element => {
  const today = new DateFormatting(new Date()).YYYY_MM_DD;

  return (
    <ScheduleGridContainer>
      {currentMonthlyDayList.map((day) => {
        if (day === undefined) return <CircularProgress />;

        const dayScheduleList = currentMonthlyScheduleList.filter(
          (schedule) => {
            return schedule.testDate === day;
          }
        );

        const isToday = Boolean(today === day);

        return (
          <DailySchedule
            key={day.toString()}
            sx={{
              border: isToday ? `2px solid ${SignatureColor.RED}` : "",
              boxSizing: "border-box",
            }}
          >
            <DailyScheduleHeader
              sx={{
                color: setDayColor(day),
                filter: setDayFilter(currentDate.month, day),
              }}
            >
              {new Date(day).getDate()}
            </DailyScheduleHeader>
            <DailyScheduleHeaderElement>
              {renderTestScheduleList(dayScheduleList)}
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
    return (
      <TestScheduleElement
        key={testSchedule.testScheduleId}
        testSchedule={testSchedule}
      />
    );
  });
};

interface TestScheduleElementProps {
  testSchedule: TestSchedule;
}
const TestScheduleElement = ({
  testSchedule,
}: TestScheduleElementProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = useNavigate();
  const handleOpen = () => {
    navigation(`/test-schedule#${testSchedule.testScheduleId}`);
    setIsOpen(true);
  };

  return (
    <>
      <TestScheduleContainer onClick={handleOpen}>
        <Typography
          variant="body2"
          sx={(theme) => ({
            ml: 1,
            width: theme.spacing(2),
            height: theme.spacing(2),
            background: "#fecd0a",
            borderRadius: theme.spacing(0.5),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          {testSchedule.testField[0]}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "flex",
            alignItems: "center",
            ml: 1,
          }}
        >
          {testSchedule.testScheduleTitle}
        </Typography>
      </TestScheduleContainer>
      <ScheduleModal
        useIsOpenState={[isOpen, setIsOpen]}
        testSchedule={testSchedule}
      />
    </>
  );
};

const ScheduleGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(7, calc(100% / 7))`,
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

const TestScheduleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  "&:hover": {
    background: SignatureColor.GRAY_BORDER,
    cursor: "pointer",
  },
}));

export default ScheduleGrid;
